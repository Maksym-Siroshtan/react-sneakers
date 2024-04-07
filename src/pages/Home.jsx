import { useState, useEffect } from "react";
import axios from "axios";

import CardList from "../components/CardList";

function Home({ favorites, cartItems, onClickToAdd, onClickToFavorite }) {
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

      const items = data.map((item) => {
        const isFavorite = favorites.some((fav) => fav.itemId === item.itemId);
        const isCartItemsCheked = cartItems.some(
          (cartItem) => cartItem.itemId === item.itemId
        );

        if (isFavorite && isCartItemsCheked) {
          return {
            ...item,
            favorited: true,
            checked: true,
          };
        } else if (isFavorite) {
          return {
            ...item,
            favorited: true,
          };
        } else if (isCartItemsCheked) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return {
            ...item,
          };
        }
      });

      setItems(items);
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
    (async () => {
      await fetchItems();
    })();
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
