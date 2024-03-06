import Card from "./Card";
function CardList() {
  return (
    <ul className="grid grid-cols-4 gap-10">
      <Card />
      <Card />
      <Card />
      <Card />
    </ul>
  );
}

export default CardList;
