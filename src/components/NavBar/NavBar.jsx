import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "/icons8-people-working-together-100.png";

export default function NavBar() {
  return (
    <div className="app-header">
      <img src={logo} alt="Logo" className="logo" />
      <nav>
        <Link to="/">Home</Link> <Link to="/"> About Us</Link>
      </nav>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
}
