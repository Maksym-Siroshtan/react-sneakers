import CartItem from "./CartItem";

function CartItemList() {
  return (
    <ul className="flex flex-col flex-1 gap-5">
      <CartItem
        title="Чоловічі Кросівки Nike Blazer Mid Suede"
        imageUrl="/sneakers/sneakers-1.jpg"
        price={6099}
      />
      <CartItem
        title="Чоловічі Кросівки Nike Air Max 270"
        imageUrl="/sneakers/sneakers-2.jpg"
        price={3799}
      />
      <CartItem
        title="Чоловічі Кросівки Nike Blazer Mid Suede"
        imageUrl="/sneakers/sneakers-3.jpg"
        price={6099}
      />
    </ul>
  );
}

export default CartItemList;
