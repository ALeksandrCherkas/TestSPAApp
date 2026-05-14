import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import OrderCard from '../components/OrderCard';
import Modal from '../components/Modal';
import img from '../575061429.webp';
import {deleteOrderAsync, fetchOrders} from '../store/orderStore';
import { fetchProducts } from '../store/productsStore';
import { useDispatch } from 'react-redux';
import { BsFillTrashFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const Orders = () => {
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.products.list);
    const orders = useSelector((state)=> state.orders.items);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderToDelete, setOrderToDelete] = useState(null);

    const selectedOrder = orders.find(o => o.id === selectedOrderId);
    const orderProducts = selectedOrder ? selectedOrder.products : [];
    const handleDeleteOrder = (order) => {
        setOrderToDelete(order);
    }

    const confirmDelete = () => {
        if (orderToDelete) {
            dispatch(deleteOrderAsync(orderToDelete.id));
            if (selectedOrderId === orderToDelete.id) setSelectedOrderId(null);
        }
        setOrderToDelete(null);
        
    }

    useEffect(()=> {
        dispatch(fetchOrders());
    }, [dispatch])
    return (
        <div className='orders'>
            <div className='orders__header'>
                <button className="add-btn">+</button>
                <h2>Приходы / {orders.length}</h2>
            </div>

            <div className={`orders-layout ${selectedOrderId ? '--active' : ''}`}>
                <div className='orders__list'>
                    {
                        orders.map(order => (
                            <OrderCard 
                                key={order.id}
                                order={order} 
                                isActive={selectedOrderId === order.id}
                                isShort={!!selectedOrderId}
                                onClick={() => setSelectedOrderId(order.id)}
                                onDelete={() => handleDeleteOrder(order)}
                            />
                        ))
                    }
                </div>
                {selectedOrderId && (
                    <div className='order__details'>
                        <button className='close-panel' onClick={() => setSelectedOrderId(null)}>
                            <IoMdClose />
                        </button>
                        <h3>{selectedOrder.title}</h3>
                        <button className='add-btn'><FaCirclePlus className='add-icon'/> Добавить продукт</button>
                        <div className='order__products' key={selectedOrder.id}>
                            {orderProducts.map(product => (
                                <div key={product.id} className='order__product-card'>
                                    <img src={img} alt="product image"/>
                                    <div className='order__product-title'>
                                        <p className='order__product-name'>{product.title}</p>
                                        <p className='order__product-serial'>{product.serial}</p>
                                    </div>
                                    <p className='order__product-status'>{product.isNew ? 'новый' : 'Б/У'}</p>
                                    <button className="product-card__delete"><BsFillTrashFill /></button>
                                </div>

                            ))}

                        </div>

                   

                    </div>
                )}
                
            </div>
            <Modal
                isOpen={!!orderToDelete}
                onClose={() => setOrderToDelete(null)}
                onConfirm={confirmDelete}
                itemName={orderToDelete?.title}
            />
        </div>
    )
}

export default Orders;