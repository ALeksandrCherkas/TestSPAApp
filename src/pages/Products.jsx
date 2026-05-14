import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { deleteProduct } from '../store/productsStore';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.products.list);
    const orders = useSelector((state)=> state.orders.list);
    
    const [filterType, setFilterType] = useState('all');
    const productTypes = [...new Set(products.map(p => p.type))];

    const filteredProducts = filterType === 'all' ? products : products.filter(p => p.type === filterType);

    const handleDelete = (id) => {
        if (window.confirm("Вы уверены, что хотите удалить этот продукт?")) {
            dispatch(deleteProduct(id));
        }
    }
    return (
        <section className='products'>
            <div className='products__header'>
                <h2>Продукты / {products.length}</h2>
                <div className='products__filter'>
                    <p>Тип:</p>
                    <select 
                        value={filterType} 
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">Все типы</option>
                        {productTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
            </div>

            <div className='products__list'>
                {filteredProducts.map((product) => {
                        const order = orders.find(order => order.id === product.order);
                        return (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                orderTitle={order}
                                onDelete={() => handleDelete(product.id)}
                            />
                        );
                    })
                }
            </div>
        </section>
    )
}

export default Products;