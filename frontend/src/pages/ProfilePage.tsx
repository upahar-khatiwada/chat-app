import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg bg-[#3c280d] text-white flex flex-col gap-6 items-center">
        <button
          onClick={() => navigate("/home")}
          className="cursor-pointer absolute left-4 top-4 flex items-center gap-1 text-white opacity-80 hover:opacity-100 hover:scale-105 transition-all"
        >
          <IoArrowBack className="text-2xl" />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="font-bold text-3xl">Profile</h1>
        <span>Your profile information</span>
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={user?.avatar}
              alt="profile picture"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* <CiCamera className="absolute text-3xl bg-[#6b4a1f] p-1 border border-amber-50 rounded-xl text-white right-1 bottom-1 cursor-pointer hover:scale-105 transition-transform" /> */}
        </div>
        {/* <span className="text-sm opacity-80">
          Click the camera to update your profile photo
        </span> */}
        <div className="w-full max-w-md bg-[#4e3413] p-5 rounded-lg shadow-md flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-300">Full Name</p>
            <p className="text-xl font-semibold">{user?.fullName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-300">Email</p>
            <p className="text-xl font-semibold">{user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
