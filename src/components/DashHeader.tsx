const Header = () => (
  <header className="flex justify-between items-center px-6 py-4 bg-white text-black shadow-md">
    <input
      type="text"
      placeholder="Quick Search"
      className="w-1/2 p-2 rounded-md border border-gray-200"
    />
    <div className="flex items-center gap-4">
      <button className="bg-gray-200 px-3 py-1 rounded-lg text-sm">
        LEARN
      </button>
      <div className="flex items-center gap-2">
        <img src="/images/woman.png" className="w-8 h-8 rounded-full" />
        <span>Chibyke Nwokolo</span>
      </div>
    </div>
  </header>
);

export default Header;
