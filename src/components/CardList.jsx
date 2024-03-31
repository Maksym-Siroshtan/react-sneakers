import Card from "./Card";
function CardList(props) {
  return (
    <ul className="grid grid-cols-4 gap-10">
      {props.items.map((item) => (
        <Card
          key={item.itemId}
          {...item}
          onClickToFavorite={props.onClickToFavorite}
          onClickToAdd={props.onClickToAdd}
        />
      ))}
    </ul>
  );
}

export default CardList;
