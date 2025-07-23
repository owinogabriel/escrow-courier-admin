import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signUpSchema, type SignUpData } from "../lib/validation";

const SignUp = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSignup = (e: React.FormEvent) => {
  e.preventDefault();

  const result = signUpSchema.safeParse(formData);

  if (!result.success) {
    const issue = result.error.issues[0];
    setError(issue.message);
    return;
  }
  
  setError(null);// Clear error and simulate success
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
        <h2 className="text-3xl font-bold mb-3 text-center text-[#DDDDF6]">
          Join Escrow Courier
        </h2>
        <h3 className="text-xl p-3 mb-4 text-[#C9C3C3] text-center">
          Create your account to get started
        </h3>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border border-gray-600 rounded"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full mb-6 p-3 border border-gray-600 rounded"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-[#CAC5FE] text-[#27282F] py-2 font-semibold rounded-full hover:bg-[#cecaf7] transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-[#9B9FAC] text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#B2BDDA] font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
