import "./assets/main.css";
import { UserContextProvider } from "./context/UserContext";
import { RouterProviderComponent as RouterProvider } from "./router/RouterProvider";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserContextProvider>
        <RouterProvider />;
      </UserContextProvider>
    </ClerkProvider>
  );
}

export default App;
