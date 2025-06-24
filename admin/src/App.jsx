// import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import auth from "./config/firebase";
// import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";

// export const backendUrl = import.meta.env.VITE_BACKEND_URL
// export const currency = "₹";

// const App = () => {
//   const [log, setLog] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const token = await user.getIdTokenResult(true);
//         if (token.claims.admin) {
//           setLog(true);
//         } else {
//           setLog(false);
//           if (navigate("/login"));
//           toast.error("Access denied. Admins only")
//         }
//       } else {
//         setLog(false);
//         if (navigate("/login"));
//       }
//     });
//   }, []);

//   if (log === null) return <p style={{ textAlign: "center" }}>Checking access...</p>;

//   return (
//     <div>
//       <ToastContainer />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/*" element={log ? <Dashboard /> : <Login />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import auth from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [log, setLog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult(true);

        if (token.claims.admin) {
          setLog(true);
        } else {
          setLog(false);
          toast.error("Access denied. Admins only", { position: "top-right" });
          navigate("/login");
        }
      } else {
        setLog(false);
        navigate("/login");
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [navigate]);

  if (log === null) {
    return <p style={{ textAlign: "center" }}>Checking access...</p>;
  }

  return (
    <div>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={log ? <Dashboard /> : <Login />} />
      </Routes>
    </div>
  );
};

export default App;
