export function TopNav() {
  return (
    <nav className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl font-bold">
          MyApp
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
