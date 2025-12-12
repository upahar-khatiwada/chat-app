// import { useEffect, useState } from "react";

// interface User {
//   fullName: string;
//   email: string;
//   avatar: string;
//   googleId: string;
// }

// const HomePage = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetch("http://localhost:3000/auth/me", {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUser(data.user);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Welcome!</h1>

//       {user && (
//         <div className="mt-4 flex flex-col gap-2">
//           <img
//             src={user.avatar}
//             alt="User"
//             className="w-20 h-20 rounded-full"
//           />

//           <p className="text-lg">Name: {user.fullName}</p>
//           <p className="text-lg">Email: {user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;

import React from 'react'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div>HomePage</div></>
  )
}

export default HomePage