import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import CardList from "./components/CardList";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = useState([]);
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

  const fetchFavorites = async () => {
    const { data } = await axios.get(
      "https://757ed0bbb74e1c15.mokky.dev/favorites"
    );

    const favoritesItems = items.map((item) => {
      const favorite = data.some((f) => f.itemId === item.itemId);

      if (favorite) {
        return {
          ...item,
          isFavorite: true,
        };
      }

      return {
        ...item,
      };
    });

    console.log(data)

    // setItems([...favoritesItems]);
    // setFavorites(data);
  };

  useEffect(() => {
    (async () => {
      await fetchItems();
      await fetchFavorites();
    })();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl m-20">
      {isDrawerOpen && <Drawer closeDrawer={closeDrawer} />}

      <Header openDrawer={openDrawer} />

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
        <CardList items={items} onClickToFavorite={onClickToFavorite} />
      </div>
    </div>
  );
}

export default App;
