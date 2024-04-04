import { useState, useEffect } from "react";
import axios from "axios";

import CardList from "../components/CardList";

function Home({ onClickToAdd, favorites, setFavorites }) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchItems = async () => {
    try {
      let title = `*${searchQuery}*`;

      const { data } = await axios.get(
        "https://757ed0bbb74e1c15.mokky.dev/items",
        {
          params: { title },
        }
      );

      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickToFavorite = async (item) => {
    try {
      if (!item.isFavorite) {
        const { data } = await axios.post(
          "https://757ed0bbb74e1c15.mokky.dev/favorites",
          {
            ...item,
          }
        );
        setFavorites([...favorites, item]);
      } else {
        await axios.delete(
          `https://757ed0bbb74e1c15.mokky.dev/favorites/${item.itemId}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchItems();
    })();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-bold">
          {searchQuery ? `Пошук за запитом: "${searchQuery}"` : `Всі кросівки`}
        </h1>
        <div className="relative flex items-center">
          <img src="/search.svg" alt="Search" className="absolute left-3" />
          <input
            onChange={() => setSearchQuery(event.target.value)}
            value={searchQuery}
            type="text"
            placeholder="Пошук..."
            className="pl-10 py-2 pr-14 outline-none border border-gray-200 rounded-lg overflow-hidden focus:border-gray-600 placeholder:text-xs"
          />
          {searchQuery && (
            <img
              onClick={() => setSearchQuery("")}
              src="/close.svg"
              alt="Clear"
              className="absolute right-3 h-full w-6 cursor-pointer"
            />
          )}
        </div>
      </div>
      <CardList
        items={items}
        onClickToAdd={onClickToAdd}
        onClickToFavorite={onClickToFavorite}
      />
    </>
  );
}

export default Home;