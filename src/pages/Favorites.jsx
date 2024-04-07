import { Link } from "react-router-dom";

import CardList from "../components/CardList";

function Favorites({ favorites, onClickToFavorite }) {
  const favoritesMapping = favorites.map((favorite) => {
    return {
      ...favorite,
      favorited: true,
    };
  });

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
      <CardList
        items={favoritesMapping}
        onClickToFavorite={onClickToFavorite}
      />
    </>
  );
}

export default Favorites;
