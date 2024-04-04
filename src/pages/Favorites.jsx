import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CardList from "../components/CardList";

function Favorites({ favorites, setFavorites }) {
  const favoritesMapping = favorites.map((favorite) => {
    return {
      ...favorite,
      favorited: true,
    };
  });

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
        <h1 className="text-2xl font-bold">Обрані</h1>
      </div>
      <CardList items={favoritesMapping} />
    </>
  );
}

export default Favorites;
