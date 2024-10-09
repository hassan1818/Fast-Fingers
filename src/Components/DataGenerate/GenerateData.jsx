import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Nav/NavBar";

const GenerateData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName;

  useEffect(() => {
    if (userName) {
      toast.success(`Welcome, ${userName} 🎉`, {
        icon: () => (
          <div
            style={{
              color: "#fff", // Icon color
              background: "#1376a2",
              borderRadius: "50%",
              fontSize: "16px",
              padding: "0px 5px",
            }}
          >
            ✔
          </div>
        ),

        style: {
          color: "#1376a2",
          fontSize: "20px",
          fontWeight: "bolder",
          height: "100px",
        },
        progressStyle: {
          background: "#1376a2",
        },
      });
    }
  }, [userName]);

  return (
    <div>
      <NavBar />
      <ToastContainer />
    </div>
  );
};

export default GenerateData;
