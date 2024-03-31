import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import CardList from "./components/CardList";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
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

  const onAddToCart = async (item) => {
    try {
      await axios.post("https://757ed0bbb74e1c15.mokky.dev/cartItems", {
        ...item,
      });

      setCartItems([...cartItems, item]);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(
        `https://757ed0bbb74e1c15.mokky.dev/cartItems/${itemId}`
      );

      setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickToAdd = async (item) => {
    onAddToCart(item);
  };

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

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get(
        "https://757ed0bbb74e1c15.mokky.dev/favorites"
      );

      setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const { data } = await axios.get(
        "https://757ed0bbb74e1c15.mokky.dev/cartItems"
      );

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    await fetchItems();
    await fetchFavorites();
    await fetchCartItems();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl m-20">
      {isDrawerOpen && (
        <Drawer
          cartItems={cartItems}
          closeDrawer={closeDrawer}
          onRemoveFromCart={onRemoveFromCart}
        />
      )}

      <Header openDrawer={openDrawer} />

      <div className="p-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold">
            {searchQuery
              ? `Пошук за запитом: "${searchQuery}"`
              : `Всі кросівки`}
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
      </div>
    </div>
  );
}

export default App;
