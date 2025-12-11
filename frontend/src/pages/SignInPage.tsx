import Navbar from "../components/Navbar";
import { useForm, type FieldValues } from "react-hook-form";
import AuthTextField from "./auth_components/AuthTextField";
import { Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log("Sign in data:", data);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-10 items-center justify-center min-h-[calc(100vh-62px)]">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-80"
        >
          <AuthTextField
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            register={register("email", { required: "Email is required" })}
            error={errors.email?.message as string}
          />

          <AuthTextField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            register={register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message as string}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded mt-2 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative w-full flex items-center">
            <div className="h-px bg-gray-400 flex-1"></div>
            <span className="px-4 text-gray-300 font-semibold">or</span>
            <div className="h-px bg-gray-400 flex-1"></div>
          </div>

          <button className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 transition-colors p-4 rounded-full shadow-sm w-full max-w-md cursor-pointer">
            <FaGoogle className="text-2xl text-amber-900" />
            <span className="text-lg font-semibold text-amber-800">Sign In with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
