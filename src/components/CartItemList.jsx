import { useAutoAnimate } from "@formkit/auto-animate/react";

import CartItem from "./CartItem";

function CartItemList({ cartItems, onRemoveFromCart }) {
  const [parent] = useAutoAnimate();

  return (
    <ul ref={parent} className="flex flex-col flex-1 gap-5 mb-5">
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
