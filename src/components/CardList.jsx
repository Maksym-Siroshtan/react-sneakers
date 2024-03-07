import Card from "./Card";
function CardList(props) {
  return (
    <ul className="grid grid-cols-4 gap-10">
      {props.items.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          price={item.price}
        />
      ))}
    </ul>
  );
}

export default CardList;
