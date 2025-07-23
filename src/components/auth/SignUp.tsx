import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // If already logged in, redirect to dashboard
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordStrong = password.length >= 6;

    if (!isEmailValid) {
      alert("Enter a valid email address.");
      return;
    }

    if (!isPasswordStrong) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    // Simulate successful signup (in real life, you'd POST this to a backend)
    alert("Signup successful! Now log in.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[url('/assets/pattern.png')] bg-cover bg-center flex flex-col items-center justify-center bg-[#0A0A0A] px-4">
    
      <form
        onSubmit={handleSignup}
        className="p-8 rounded shadow w-full max-w-md md:gap-7 bg-[#181A1E] shadow-gray-200"
         noValidate
      >
               <h2 className="text-2xl md:text-4xl font-bold mb-3 text-center text-[#DDDDF6]">
         Join Escrow Courier
        </h2>
        <h3 className="text-xl  p-3 mb-4 text text-[#C9C3C3] text-center">
          Create your account to get started
        </h3>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4  p-3 border input  rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full label mb-6  p-3 border  rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          type="submit"
          className="w-full  bg-[#CAC5FE] text-[#27282F] py-2 font-semibold  rounded-full hover:bg-[#cecaf7] transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-[#9B9FAC] text-sm">Already have an account?  <a href="/login" className="text-[#B2BDDA] font-semibold hover:underline">
          Log in
        </a></p>
       
      </form>
    </div>
  );
};

export default SignUp;
