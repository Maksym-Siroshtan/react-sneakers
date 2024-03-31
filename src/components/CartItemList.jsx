import CartItem from "./CartItem";

function CartItemList({ cartItems, onRemoveFromCart }) {
  return (
    <ul className="flex flex-col flex-1 gap-5">
      {cartItems.map((item) => (
        <CartItem
          key={item.itemId}
          {...item}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
    </ul>
  );
}

export default CartItemList;
