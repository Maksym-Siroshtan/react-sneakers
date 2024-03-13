import { useState } from "react";

function Card({ itemId, title, imageUrl, price, onClickToFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onClickToFavorite({ itemId, title, imageUrl, price, isFavorite });
  };

  const onClickAdd = () => {
    console.log("onClickAdd!");
    setIsAdded(!isAdded);
  };
  return (
    <li className="relative border border-gray-200 bg-white rounded-3xl p-7 hover:shadow-xl hover:scale-105 transition-all">
      <img
        onClick={onClickFavorite}
        src={isFavorite ? "/like-2.svg" : "/like-1.svg"}
        alt="Like"
        className="absolute left-7 top-8 cursor-pointer"
      />
      <img src={imageUrl} alt={title} className="w-36 mb-3.5" />
      <h4 className="text-sm font-medium mb-3.5">{title}</h4>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-gray-400">Ціна:</p>
          <b className="text-sm">{price} грн.</b>
        </div>

        <img
          onClick={onClickAdd}
          src={isAdded ? "/checked.svg" : "/plus.svg"}
          alt="Plus"
          className="cursor-pointer"
        />
      </div>
    </li>
  );
}

export default Card;
