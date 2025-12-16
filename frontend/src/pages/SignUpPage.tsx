// UNUSED PAGE

// import { CiChat2 } from "react-icons/ci";
// import AuthTextField from "./auth_components/AuthTextField";
// import { User, Mail, Lock, Image as ImageIcon } from "lucide-react";
// import { useForm } from "react-hook-form";
// import AuthNavbar from "./auth_components/AuthNavBar";
// import { useState } from "react";

// const SignUpPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [preview, setPreview] = useState<string | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));
//   };

//   const onSubmit = () => {}

//   return (
//     <>
//       <AuthNavbar />

//       <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-62px)]">
//         <div className="bg-[#795C34] p-2 rounded-xl">
//           <CiChat2 className="text-white text-4xl" />
//         </div>

//         <div className="flex flex-col items-center">
//           <h1 className="text-3xl font-bold">Create an Account</h1>
//           <span>Get started with your free account</span>
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col gap-3 w-80"
//         >
//           <div className="flex flex-col items-center gap-2">
//             <label className="cursor-pointer">
//               <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
//                 {preview ? (
//                   <img
//                     src={preview}
//                     alt="Profile preview"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <ImageIcon className="text-gray-400 w-8 h-8" />
//                 )}
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 {...register("profilePicture", {
//                   required: "Profile picture is required",
//                 })}
//                 onChange={handleImageChange}
//               />
//             </label>
//             {errors.profilePicture && (
//               <p className="text-red-500 text-sm">
//                 {errors.profilePicture.message as string}
//               </p>
//             )}
//           </div>

//           <AuthTextField
//             label="Full Name"
//             type="text"
//             placeholder="Enter your Full Name"
//             icon={User}
//             register={register("fullName", {
//               required: "Full Name is required",
//             })}
//             error={errors.fullName?.message as string}
//           />

//           <AuthTextField
//             label="Email"
//             type="email"
//             placeholder="Enter your email"
//             icon={Mail}
//             register={register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Enter a valid email address",
//               },
//             })}
//             error={errors.email?.message as string}
//           />

//           <AuthTextField
//             label="Password"
//             type="password"
//             placeholder="Enter your password"
//             icon={Lock}
//             register={register("password", {
//               required: "Password is required",
//               minLength: { value: 8, message: "Minimum 8 characters" },
//               pattern: {
//                 value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
//                 message:
//                   "Must include uppercase, lowercase, number, special character",
//               },
//             })}
//             error={errors.password?.message as string}
//           />

//           <button
//             type="submit"
//             className="bg-linear-to-r from-[#231709] to-[#4A2511] text-white p-2 rounded mt-2"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default SignUpPage;
