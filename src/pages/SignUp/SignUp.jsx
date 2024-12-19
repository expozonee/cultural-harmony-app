import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <SignUp
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
      signInUrl="/sign-in"
      path="/sign-up"
    />
  );
}
