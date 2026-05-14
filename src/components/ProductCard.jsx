import img from '../575061429.webp';
import { formatDate } from '../utils/fomatDate';
import { BsFillTrashFill } from "react-icons/bs";
const ProductCard = ({ product, orderTitle , onDelete}) => {
    const usdPrice = product.price_usd;
    const uahPrice = product.price_uah;
    
    return (
        <div className='product-card'>
            <img src={img} alt={product.title} />
            <div className="product-card__title">
                <h3>{product.title}</h3>
                <p>{product.serial}</p>
            </div>
            <div className="product-card__guarantee">
                <p>с {formatDate(product.guarantee_start)}</p>
                <p>по {formatDate(product.guarantee_end)}</p>
            </div>
            <h3 className="product-card__isNew">{product.isNew ? 'новый' : 'Б/У'}</h3>
            <div className="product-card__price">
                <p>{usdPrice} $</p>
                <p>{uahPrice} ₴</p>
            </div>
            <h3 className="product-card__type">{product.type}</h3>
            <h3 className="product-card__name">-</h3>
            <h3 className="product-card__order">{orderTitle ? orderTitle.title : 'нет заказа'}</h3>
            <div>
                <p className="product-card__date">{formatDate(product.guarantee_start)}</p>
                <p className="product-card__date">{formatDate(product.guarantee_end)}</p>
            </div>
            
            <button className="product-card__delete" onClick={onDelete}><BsFillTrashFill /></button>
            
        </div>
    );
};

export default ProductCard;