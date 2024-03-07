import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import CardList from "./components/CardList";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get(
        "https://8ca1b7098d059351.mokky.dev/items"
      );
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl m-20">
      <Header />

      <div className="p-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold">Всі кросівки</h1>
          <div className="relative flex items-center">
            <img src="/search.svg" alt="Search" className="absolute left-3" />
            <input
              type="text"
              placeholder="Пошук..."
              className="pl-10 py-2 pr-4 outline-none border border-gray-200 rounded-lg overflow-hidden focus:border-gray-600 placeholder:text-xs"
            />
          </div>
        </div>
        <CardList items={items} />
      </div>
    </div>
  );
}

export default App;
