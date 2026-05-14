import { use } from "react";
import { useSelector } from 'react-redux';
import { formatDate } from "../utils/fomatDate";
import { BsListUl, BsFillTrashFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const formatOrderDate = (date) => {
  const months = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];

  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} / ${month} / ${year}`;
};

const OrderCard = ({ order, isActive, isShort, onClick, onDelete }) => {

    const allProducts = useSelector((state) => state.products.list);
    const orderProducts = allProducts.filter(p => order.products.includes(p.id));

    const sumUSD = orderProducts.reduce((acc, p) => acc + (p.price.find(pr => pr.symbol ==='USD')?.value || 0), 0);
    const sumUAH = orderProducts.reduce((acc, p) => acc + (p.price.find(pr => pr.symbol ==='UAH')?.value || 0), 0);
    const handleDelete= (e) => {
        e.stopPropagation();
        onDelete();
    }
    return (
        <div className={`order-card ${isActive ? '--active' : ''} ${isShort ? '--short' : ''}`} onClick={onClick}>

            {!isShort && <h3 className="order-card__title">{order.title}</h3>}
            <div className="order-card__info-group">
                <div className="order-card__info-count">
                    <BsListUl className="order-card__icon"/>
                    <div className="order-card__count">
                        <strong>{orderProducts.length}</strong>
                        <span>Продукта</span>
                    </div>
                </div>
                

                <div className="order-card__date">
                    <span className="date-short">
                        {new Date(order.date).toLocaleDateString('ru-RU', { month: '2-digit', day: '2-digit' }).replace('.', ' / ')}
                    </span>
                    <span className="date-full">
                        {formatOrderDate(new Date(order.date))}
                    </span>
                </div>
                {!isShort && (
                <>
                    
                    <div className="order-card__price">
                        <p className="price-usd">{sumUSD} $</p>
                        <p>{sumUAH} UAH</p>
                    </div>
                    <button className="order-card__delete" onClick={handleDelete}><BsFillTrashFill /></button>
                </>
            )}
            </div>

            
            {isShort && isActive && (<div className="order-card__arrow"><MdOutlineKeyboardArrowRight /></div>)}
            
        </div>
        )
    };

export default OrderCard;