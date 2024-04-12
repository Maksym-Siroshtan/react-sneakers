function CartItem({ itemId, title, imageUrl, price, onRemoveFromCart }) {
  return (
    <li className="flex items-center justify-between gap-4 border border-gray-200 bg-white rounded-3xl p-5 overflow-hidden hover:shadow-xl hover:scale-105 transition-all">
      <img src={imageUrl} alt={title} className="w-20" />
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center justify-between">
          <b className="text-sm">{price} грн.</b>
          <img
            onClick={() => onRemoveFromCart(itemId)}
            src="/close.svg"
            alt="Close"
            className="cursor-pointer transition-all hover:scale-110"
          />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
