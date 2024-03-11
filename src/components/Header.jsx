function Header({ openDrawer }) {
  return (
    <header className="flex items-center justify-between p-12 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" className="w-10" />
        <div>
          <h3 className="text-sm font-bold uppercase">React Sneakers</h3>
          <p className="text-xs font-medium text-gray-400">
            Магазин найкрайших кросівок
          </p>
        </div>
      </div>

      <nav>
        <ul className="flex gap-8">
          <li
            onClick={openDrawer}
            className="flex gap-4 cursor-pointer hover:underline"
          >
            <img src="/cart.svg" alt="Cart" />
            <b className="text-xs text-gray-500 hover:text-black">1205 грн.</b>
          </li>
          <li className="flex gap-4 cursor-pointer hover:underline">
            <img src="/heart.svg" alt="Heart" />
            <span className="text-xs font-medium  text-gray-500 hover:text-black">
              Обрані
            </span>
          </li>
          <li className="flex gap-4 cursor-pointer hover:underline">
            <img src="/profile.svg" alt="Profile" />
            <span className="text-xs font-medium text-gray-500 hover:text-black">
              Профіль
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
