import CartItemList from "./CartItemList";

function Drawer({ closeDrawer }) {
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

        <CartItemList />

        <div>
          <div className="flex items-end gap-1 mb-5">
            <span>Разом:</span>
            <div className="flex-1 border-b border-dashed border-gray-200"></div>
            <b>10000 грн.</b>
          </div>
          <div className="flex items-end gap-1 mb-6">
            <span>Податок 5%:</span>
            <div className="flex-1 border-b border-dashed border-gray-200"></div>
            <b>500 грн.</b>
          </div>

          <button className="flex items-center justify-center gap-10 w-full text-white bg-lime-500 py-3 font-semibold rounded-2xl cursor-pointer transition hover:bg-lime-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
            Оформити замовлення
            <img src="/arrow-next.svg" alt="Order" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Drawer;
