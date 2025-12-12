import Navbar from "../components/Navbar";
import { CiCamera } from "react-icons/ci";

const ProfilePage = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg bg-gray-400 text-white flex flex-col gap-6 items-center">
        <h1 className="font-bold text-3xl">Profile</h1>
        <span>Your profile information</span>

        <div className="relative w-32 h-32">
          <div className="bg-red-400 w-full h-full rounded-full"></div>

          <CiCamera className="absolute text-3xl bg-gray-300 p-1 rounded-xl text-black right-1 bottom-1 cursor-pointer hover:scale-105 transition-transform" />
        </div>

        <span className="text-sm opacity-80">
          Click the camera to update your profile photo
        </span>

        <div className="w-full max-w-md bg-gray-500 p-5 rounded-lg shadow-md flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-300">Full Name</p>
            <p className="text-xl font-semibold">Walter White</p>
          </div>

          <div>
            <p className="text-sm text-gray-300">Email</p>
            <p className="text-xl font-semibold">walter@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
