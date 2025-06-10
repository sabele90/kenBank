const Sidebar = () => {
  return (
<aside className="w-20 sm:w-24 h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-md flex flex-col items-center rounded-l-3xl border-r border-gray-300 dark:border-gray-600">
  <div className="mb-10 mt-6">
    <div className="w-11 h-11 rounded-md overflow-hidden border border-gray-300 dark:border-gray-600 shadow-md">
      {/* Imagen modo claro */}
      <img
        src="/logo.png"
        alt="Kenbank Logo Light"
        className="block dark:hidden w-full h-full object-cover"
      />
      {/* Imagen modo oscuro */}
      <img
        src="/darkLogo.png"
        alt="Kenbank Logo Dark"
        className="hidden dark:block w-full h-full object-cover"
      />
    </div>
  </div>
</aside>

  );
};

export default Sidebar;
