import "../styles/Navbar.css";
function Navbar() {
  return (
    <nav>
      <h2>CareerPilot AI</h2>

      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div>
        <button>Login</button>
        <button>Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;