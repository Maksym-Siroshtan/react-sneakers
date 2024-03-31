import CartItem from "./CartItem";

function CartItemList({ cartItems }) {
  return (
    <ul className="flex flex-col flex-1 gap-5">
      {cartItems.map((item) => (
        <CartItem key={item.itemId} {...item} />
      ))}
    </ul>
  );
}

export default CartItemList;
