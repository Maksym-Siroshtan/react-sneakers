import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CardList from "../components/CardList";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalSumOrders, setTotalSumOrders] = useState(0);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://757ed0bbb74e1c15.mokky.dev/orders"
      );

      const flatOrders = data
        .map((item) => (item.order.length !== 0 ? [...item.order] : null))
        .flat();

      const totalOrders = flatOrders.reduce((sum, item) => sum + item.price, 0);

      setTotalSumOrders(totalOrders);

      setOrders(flatOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  return (
    <>
      <div className="flex items-center gap-4 mb-12">
        <Link to="/">
          <img
            width={40}
            height={35}
            src="/arrow-right.svg"
            alt="Arrow"
            className="border p-4 rotate-180 rounded-xl cursor-pointer hover:-translate-x-0.5 transition-all"
          />
        </Link>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold">Мої покупки</h1>
          <span>
            Загальні витрати за весь час: <b>{totalSumOrders} грн.</b>
          </span>
        </div>
      </div>
      <CardList items={orders} />
    </>
  );
}

export default Orders;
