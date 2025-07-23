import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "../lib/validation";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const onSubmit = () => {
    login("fake-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[url('/assets/pattern.png')] bg-cover bg-center flex items-center justify-center bg-[#0A0A0A] gap-4 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#181A1E] space-y-6 p-8 rounded shadow-md w-full max-w-md"
        noValidate
      >
        <h2 className="text-3xl font-bold text-center text-[#DDDDF6]">
          Welcome back
        </h2>
        <h3 className="text-xl text-[#C9C3C3] text-center">
          Access your Escrow Courier dashboard
        </h3>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-gray-600 rounded bg-[#1f2126] text-white placeholder:text-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-gray-600 rounded bg-[#1f2126] text-white placeholder:text-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#CAC5FE] text-[#27282F] py-2 font-semibold rounded-full hover:bg-[#cecaf7] transition"
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
