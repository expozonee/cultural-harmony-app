import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import logo from "/Mediamodifier-Design.svg";
import { useState } from "react";

export default function NavBar() {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(pathname);
  const { isSignedIn } = useUser();

  return (
    <header className="app-header">
      <div className="logo-and-nav">
        <img src={logo} alt="Logo" className="logo" />
        <nav>
          <ul>
            <li>
              <Link
                style={{
                  backgroundColor: `${currentPage === "/" ? "#A3F3F5" : ""}`,
                }}
                to="/"
                onClick={() => setCurrentPage("/")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                style={{
                  backgroundColor: `${currentPage === "/events" ? "#A3F3F5" : ""}`,
                }}
                to="/events"
                onClick={() => setCurrentPage("/events")}
              >
                Events
              </Link>
            </li>
            {isSignedIn && (
              <li>
                <Link
                  style={{
                    backgroundColor: `${currentPage === "/admin" ? "red" : ""}`,
                  }}
                  to="/admin"
                  onClick={() => setCurrentPage("/admin")}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/" onClick={() => setCurrentPage("about-us")}>
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
