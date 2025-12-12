import { CiChat2 } from "react-icons/ci";
import AuthTextField from "./auth_components/AuthTextField";
import { User, Mail, Lock } from "lucide-react";
import { useForm, type FieldValues } from "react-hook-form";
import AuthNavbar from "./auth_components/AuthNavBar";

const SignUpPage = () => {
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
      <AuthNavbar />

      <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-62px)]">
        <div className="bg-gray-600 p-2 border border-none rounded-xl">
          <CiChat2 className="text-white text-4xl" />
        </div>
        <div className="flex flex-col mx-auto items-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <span>Get started with your free account</span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-80"
        >
          <AuthTextField
            label="Full Name"
            type="fullName"
            placeholder="Enter your Full Name"
            icon={User}
            register={register("fullName", {
              required: "Full Name is required",
            })}
            error={errors.fullName?.message as string}
          />

          <AuthTextField
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            error={errors.email?.message as string}
          />

          <AuthTextField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            register={register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                message:
                  "Must include uppercase, lowercase, number, special character",
              },
            })}
            error={errors.password?.message as string}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded mt-2 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
