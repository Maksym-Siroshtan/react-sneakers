import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import CardList from "./components/CardList";

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchItems = async () => {
    let title = `*${searchQuery}*`;

    const { data } = await axios.get(
      "https://757ed0bbb74e1c15.mokky.dev/items",
      {
        params: { title },
      }
    );
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl m-20">
      <Header />

      <div className="p-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold">Всі кросівки</h1>
          <div className="relative flex items-center">
            <img src="/search.svg" alt="Search" className="absolute left-3" />
            <input
              onChange={() => setSearchQuery(event.target.value)}
              value={searchQuery}
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
