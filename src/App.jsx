import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onAddToCart = async (item) => {
    try {
      setCartItems([...cartItems, item]);

      const { data } = await axios.post(
        "https://757ed0bbb74e1c15.mokky.dev/cartItems",
        {
          ...item,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFromCart = async (itemId) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));

      await axios.delete(
        `https://757ed0bbb74e1c15.mokky.dev/cartItems/${itemId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onClickToFavorite = async (item) => {
    try {
      const isFavoriteItem = (item) =>
        favorites.find((favorite) => favorite.itemId === item.itemId);

      if (isFavoriteItem(item)) {
        setFavorites((previous) =>
          previous.filter((prev) => prev.itemId !== item.itemId)
        );

        await axios.delete(
          `https://757ed0bbb74e1c15.mokky.dev/favorites/${
            isFavoriteItem(item).favoriteId
          }`
        );
      } else {
        const { data } = await axios.post(
          "https://757ed0bbb74e1c15.mokky.dev/favorites",
          {
            ...item,
          }
        );

        item.favoriteId = data.id;

        setFavorites([...favorites, item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickToAdd = async (item) => {
    if (cartItems.find((cartItem) => cartItem.itemId === item.itemId)) {
      onRemoveFromCart(item.itemId);
    } else {
      onAddToCart(item);
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

  useEffect(() => {
    (async () => {
      await fetchFavorites();
      await fetchCartItems();
    })();
  }, []);

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
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onClickToAdd={(item) => onClickToAdd(item)}
                onClickToFavorite={(item) => onClickToFavorite(item)}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                onClickToFavorite={(item) => onClickToFavorite(item)}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
