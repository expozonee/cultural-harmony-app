import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

export default function SignInPage() {
  const location = useLocation();

  const fallbackRedirectUrl = location.state?.from || "/";

  return (
    <div className="flex justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: {
              marginTop: "150px",
            },
            formButtonPrimary: {
              backgroundColor: "#007bff",
              border: "none",
            },
          },
        }}
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl={fallbackRedirectUrl} 
      />
    </div>
  );
}
