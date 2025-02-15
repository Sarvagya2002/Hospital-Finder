import { useEffect } from "react";

const Login = ({ setUser }) => {
  const API_KEY = "409771205900-qoq2niqdnmfer3843i1gfgm5nvmilga1.apps.googleusercontent.com"
  useEffect(() => {
    console.log("✅ Google Client ID:", API_KEY);

    if (!API_KEY) {
      console.error("🚨 ERROR: Google Client ID is missing!");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log("✅ Google Script Loaded!");

      window.google.accounts.id.initialize({
        client_id: API_KEY,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" }
      );

      console.log("✅ Google Login Button Rendered!");
    };
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("✅ Google Login Response:", response);
    const userObject = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("✅ Decoded User:", userObject);
    setUser(userObject);
  };

  return (
    <div className="login-container">
      <h1>Login to Find Nearby Hospitals</h1>
      <div id="google-login-btn"></div>
    </div>
  );
};

export default Login;
