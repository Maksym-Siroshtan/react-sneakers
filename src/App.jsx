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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const vatPrice = Math.round((totalPrice * 5) / 100);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const onClickToFavorite = async (item) => {
    try {
      const isFavoriteItem = favorites.find(
        (favorite) => favorite.itemId === item.itemId
      );

      if (isFavoriteItem) {
        setFavorites((previous) =>
          previous.filter((prev) => prev.itemId !== item.itemId)
        );

        await axios.delete(
          `https://757ed0bbb74e1c15.mokky.dev/favorites/${isFavoriteItem.favoriteId}`
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

  const onAddToCart = async (item) => {
    try {
      const { data } = await axios.post(
        "https://757ed0bbb74e1c15.mokky.dev/cartItems",
        {
          ...item,
        }
      );

      item.cartItemId = data.id;

      setCartItems([...cartItems, item]);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFromCart = async (itemId) => {
    try {
      const isCartItem = cartItems.find(
        (cartItem) => cartItem.itemId === itemId
      );

      setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));

      await axios.delete(
        `https://757ed0bbb74e1c15.mokky.dev/cartItems/${isCartItem.cartItemId}`
      );
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
          totalPrice={totalPrice}
          vatPrice={vatPrice}
        />
      )}

      <Header openDrawer={openDrawer} totalPrice={totalPrice} />

      <div className="p-12">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onClickToFavorite={(item) => onClickToFavorite(item)}
                onClickToAdd={(item) => onClickToAdd(item)}
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
                onClickToAdd={(item) => onClickToAdd(item)}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
