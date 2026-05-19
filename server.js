const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./bd'); 
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", 
      "http://127.0.0.1:3000", 
      "http://localhost:3001",
      "http://35.209.43.87:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:3001",
    "http://35.209.43.87:3000" 
  ],
  credentials: true
}));
app.use(express.json()); 


let activeSockets = new Set(); 

io.on('connection', (socket) => {
    activeSockets.add(socket.id); 
    io.emit('activeSessions', activeSockets.size);
    console.log(`User connected: ${socket.id}. Total unique: ${activeSockets.size}`);

    socket.on('disconnect', () => {
        activeSockets.delete(socket.id); 
        io.emit('activeSessions', activeSockets.size);
        console.log(`User disconnected. Total unique: ${activeSockets.size}`);
    });
});


app.get('/api/orders', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT o.*, p.id as p_id, p.title as p_title, p.price_usd, p.price_uah, p.serial
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
        `);

        const orders = rows.reduce((acc, row) => {
            let order = acc.find(o => o.id === row.id);
            if (!order) {
                order = { ...row, products: [] };
                delete order.p_id; delete order.p_title; 
                acc.push(order);
            }
            if (row.p_id) {
                order.products.push({ 
                    id: row.p_id, 
                    title: row.p_title, 
                    price: [
                        { value: row.price_usd, symbol: 'USD' },
                        { value: row.price_uah, symbol: 'UAH' }
                    ]
                });
            }
            return acc;
        }, []);

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера при чтении БД" });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM order_items WHERE order_id = ?', [id]);
        await db.execute('DELETE FROM orders WHERE id = ?', [id]);
        res.json({ message: "Заказ успешно удален" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении заказа" });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении продуктов" });
    }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM order_items WHERE product_id = ?', [id]);
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Продукт не найден' });
    }

    res.json({ message: 'Продукт успешно удален', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера при удалении продукта' });
  }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});