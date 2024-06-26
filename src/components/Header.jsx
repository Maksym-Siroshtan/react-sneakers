import { Link } from "react-router-dom";

function Header({ openDrawer, favoritesLength, totalPrice }) {
  return (
    <header className="flex items-center justify-between p-12 border-b border-gray-200">
      <Link to={"/"}>
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="w-10" />
          <div>
            <h3 className="text-sm font-bold uppercase">React Sneakers</h3>
            <p className="text-xs font-medium text-gray-400">
              Магазин найкрайших кросівок
            </p>
          </div>
        </div>
      </Link>

      <nav>
        <ul className="flex items-center gap-8">
          <li
            onClick={openDrawer}
            className="flex gap-4 cursor-pointer hover:underline"
          >
            <img src="/cart.svg" alt="Cart" />
            <b className="text-xs text-gray-500 hover:text-black">
              {totalPrice} грн.
            </b>
          </li>
          <li>
            <Link to={"/favorites"}>
              <template className="flex gap-4 cursor-pointer hover:underline">
                <img src="/heart.svg" alt="Heart" />
                <span className="flex gap-2 text-xs font-medium  text-gray-500 hover:text-black">
                  Обрані <b className="text-red-500">{favoritesLength}</b>
                </span>
              </template>
            </Link>
          </li>
          <Link to={"/orders"}>
            <li className="flex gap-4 cursor-pointer hover:underline">
              <img src="/profile.svg" alt="Profile" />
              <span className="text-xs font-medium text-gray-500 hover:text-black">
                Профіль
              </span>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
