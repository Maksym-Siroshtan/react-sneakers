import { useAutoAnimate } from "@formkit/auto-animate/react";

import Card from "./Card";

function CardList({ items, isLoading, onClickToFavorite, onClickToAdd }) {
  const [parent] = useAutoAnimate();

  const renderItems = () => {
    return (isLoading ? [...Array(12)] : items).map((item, index) => (
      <Card
        key={index}
        {...item}
        isLoading={isLoading}
        onClickToFavorite={onClickToFavorite ? onClickToFavorite : null}
        onClickToAdd={onClickToAdd ? onClickToAdd : null}
      />
    ));
  };

  return (
    <ul ref={parent} className="grid grid-cols-4 gap-10">
      {renderItems()}
    </ul>
  );
}

export default CardList;
