import { useAutoAnimate } from "@formkit/auto-animate/react";

import Card from "./Card";

function CardList({ items, onClickToFavorite, onClickToAdd }) {
  const [parent] = useAutoAnimate();

  return (
    <ul ref={parent} className="grid grid-cols-4 gap-10">
      {items.map((item) => (
        <Card
          key={item.itemId}
          {...item}
          onClickToFavorite={onClickToFavorite ? onClickToFavorite : null}
          onClickToAdd={onClickToAdd ? onClickToAdd : null}
        />
      ))}
    </ul>
  );
}

export default CardList;
