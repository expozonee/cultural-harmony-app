import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import logo from "/Mediamodifier-Design.svg";
import { useState } from "react";

export default function NavBar() {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(pathname);
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = (path) => {
    setCurrentPage(path);
    setMenuOpen(false); 
  };

  return (
    <header className="app-header">
      <button className="hamburger-menu" onClick={toggleMenu}>☰</button>
      <div className="logo-and-nav">
        <img src={logo} alt="Logo" className="logo" />
        <nav className={menuOpen ? "nav-open" : ""}>
          <ul>
            <li>
              <Link
                style={{
                  backgroundColor: `${currentPage === "/" ? "#d8f5fe" : ""}`,
                }}
                to="/"
                onClick={() => handleLinkClick("/")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                style={{
                  backgroundColor: `${
                    currentPage === "/events" ? "#d8f5fe" : ""
                  }`,
                }}
                to="/events"
                onClick={() => handleLinkClick("/events")}
              >
                Events
              </Link>
            </li>
            {isSignedIn && (
              <li>
                <Link
                  style={{
                    backgroundColor: `${
                      currentPage === "/admin" ? "#d8f5fe" : ""
                    }`,
                  }}
                  to="/admin"
                  onClick={() => handleLinkClick("/admin")}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                style={{
                  backgroundColor: `${
                    currentPage === "/AboutUsPage" ? "#d8f5fe" : ""
                  }`,
                }}
                to="/AboutUsPage"
                onClick={() => handleLinkClick("/AboutUsPage")}
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="app-header__buttons">
        <SignedOut>
          <Link to={"/sign-in"}>
            <button className="sign-in__button">Sign In</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
