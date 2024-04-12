import { useState } from "react";
import axios from "axios";

import InfoBlock from "./InfoBlock";
import CartItemList from "./CartItemList";

function Drawer({
  cartItems,
  setCartItems,
  closeDrawer,
  onRemoveFromCart,
  totalPrice,
  vatPrice,
}) {
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const onClickToBuyOrder = async (order) => {
    try {
      setIsOrderLoading(true);

      await axios.post("https://757ed0bbb74e1c15.mokky.dev/orders", {
        order,
        totalPrice,
      });

      cartItems.forEach(async (_, index) => {
        await axios.delete(
          `https://757ed0bbb74e1c15.mokky.dev/cartItems/${index + 1}`
        );
      });

      setCartItems([]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOrderLoading(false);
    }
  };

  const isOrderLoadingOrCartIsEmpty = () => {
    if (isOrderLoading && cartItems.length !== 0) {
      return (
        <div className="h-full flex flex-col justify-center">
          <InfoBlock
            closeDrawer={closeDrawer}
            title="Замовлення оформлено."
            imageUrl="/order-success-icon.png"
            description="Ваше замовлення незабаром буде передано кур'єрській доставці."
          />
        </div>
      );
    } else if (cartItems.length === 0) {
      return (
        <div className="h-full flex flex-col justify-center">
          <InfoBlock
            closeDrawer={closeDrawer}
            title="Кошик порожній"
            imageUrl="/package-icon.png"
            description="Додайте хоча б одну пару кросівок, щоб зробити замовлення."
          />
        </div>
      );
    }
  };

  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full bg-black opacity-40 z-10"></div>
      <div className="fixed top-0 right-0 flex flex-col w-96 h-full overflow-auto bg-white p-7 z-20">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-bold">Кошик</h2>
          <img
            onClick={closeDrawer}
            src="/close.svg"
            alt="Close"
            className="cursor-pointer transition-all hover:scale-110"
          />
        </div>

        {isOrderLoading || cartItems.length === 0 ? (
          isOrderLoadingOrCartIsEmpty()
        ) : (
          <>
            <CartItemList
              cartItems={cartItems}
              onRemoveFromCart={onRemoveFromCart}
            />

            <div>
              <div className="flex items-end gap-1 mb-5">
                <span>Разом:</span>
                <div className="flex-1 border-b border-dashed border-gray-200"></div>
                <b>{totalPrice} грн.</b>
              </div>
              <div className="flex items-end gap-1 mb-6">
                <span>Податок 5%:</span>
                <div className="flex-1 border-b border-dashed border-gray-200"></div>
                <b>{vatPrice} грн.</b>
              </div>

              <button
                onClick={() => onClickToBuyOrder(cartItems)}
                disabled={isOrderLoading}
                className="flex items-center justify-center gap-10 w-full text-white bg-lime-500 py-3 font-semibold rounded-2xl cursor-pointer transition hover:bg-lime-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Оформити замовлення
                <img src="/arrow-next.svg" alt="Order" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Drawer;
