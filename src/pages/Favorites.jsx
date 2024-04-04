import { useEffect } from "react";
import axios from "axios";

import CardList from "../components/CardList";

function Favorites({ favorites, setFavorites }) {
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
    })();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-bold">Обрані</h1>
      </div>
      <CardList items={favorites} />
    </>
  );
}

export default Favorites;
