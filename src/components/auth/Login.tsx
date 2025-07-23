import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect logged-in users away from login
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordStrong = password.length >= 6;

    if (!isEmailValid || !isPasswordStrong) {
      alert("Invalid credentials. Use a real email & password with 6+ chars.");
      return;
    }

    // Fake login: Save token and redirect
    login("fake-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[url('/assets/pattern.png')] bg-cover bg-center flex items-center justify-center bg-[#0A0A0A] gap-4 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#181A1E] space-y-6 p-8 rounded shadow-gray-200 shadow w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-3 text-center text-[#DDDDF6]">
          Welcome back
        </h2>
        <h3 className="text-xl  p-3 mb-4 text text-[#C9C3C3] text-center">
          Log In to Continue to Escrow Courier
        </h3>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 borde rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-[#CAC5FE] text-[#27282F] py-2 font-semibold  rounded-full hover:bg-[#cecaf7] transition"
        >
          Log In
        </button>

        <p className="text-center text-[#9B9FAC] mt-4 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#B2BDDA] font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
