// import React from 'react'
// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:3000/auth/me", {
//       credentials: "include",
//     })
//       .then((res) => {
//         if (res.status === 200) setAuthenticated(true);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return authenticated ? children : <Navigate to="/signin" />;
// };

// export default ProtectedRoute;
