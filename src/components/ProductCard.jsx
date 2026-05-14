import img from '../575061429.webp';
import { formatDate } from '../utils/fomatDate';

const ProductCard = ({ product, orderTitle , onDelete}) => {
    const usdPrice = product.price.find(price => price.symbol === 'USD');
    const uahPrice = product.price.find(price => price.symbol === 'UAH');

    
    return (
        <div className='product-card'>
            <img src={img} alt={product.title} />
            <div className="product-card__title">
                <h3>{product.title}</h3>
                <p>{product.serialNumber}</p>
            </div>
            <div className="product-card__guarantee">
                <p>с {formatDate(product.guarantee.start)}</p>
                <p>по {formatDate(product.guarantee.end)}</p>
            </div>
            <h3 className="product-card__isNew">{product.isNew ? 'новый' : 'Б/У'}</h3>
            <div className="product-card__price">
                <p>{usdPrice.value} {usdPrice.symbol}</p>
                <p>{uahPrice.value} {uahPrice.symbol}</p>
            </div>
            <h3 className="product-card__type">{product.type}</h3>
            <h3 className="product-card__name">-</h3>
            <h3 className="product-card__order">{orderTitle ? orderTitle.title : 'нет заказа'}</h3>
            <div>
                <p className="product-card__date">{formatDate(product.guarantee.start)}</p>
                <p className="product-card__date">{formatDate(product.guarantee.end)}</p>
            </div>
            
            <button className="product-card__delete" onClick={onDelete}>&#128465;</button>
            
        </div>
    );
};

export default ProductCard;