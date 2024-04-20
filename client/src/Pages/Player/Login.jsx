import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../Components/preloader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSessionStorage } from "./utils";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    reg_no: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Email is required";
    tempErrors.reg_no = formData.reg_no
      ? ""
      : "Registration number is required";
    tempErrors.password = formData.password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/plyr_log",
          {
            email: formData.email,
            reg_no: formData.reg_no,
            password: formData.password,
          }
        );

        if (response.status === 200) {
          const { email, reg_no } = formData;
          const player = { email, reg_no };

          // Set session storage
          setSessionStorage("player", player);

          // Reload the page
          window.location.reload();
          window.location.href = "/";
          toast.success("Login successful");
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <center>
          <Preloader />
        </center>
      ) : (
        <div className="flex flex-col items-center shadow-xl justify-center max-w-md mx-auto my-10 p-6 bg-white rounded-lg">
          <ToastContainer position="bottom-right" />
          <img
            src="./images/rvslogo.png"
            alt="Logo"
            className="logo w-20 h-20 mb-4 "
          />
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              className={`form-input ${
                errors.email ? "input-error" : ""
              }p-2 shadow-md`}
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="error-message">{errors.email}</div>

            <input
              className={`form-input ${
                errors.reg_no ? "input-error" : ""
              }p-2 shadow-md`}
              type="text"
              name="reg_no"
              placeholder="Reg No"
              value={formData.reg_no}
              onChange={handleInputChange}
            />
            <div className="error-message">{errors.reg_no}</div>

            <input
              className={`form-input ${
                errors.password ? "input-error" : ""
              } p-2 shadow-md`}
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="error-message">{errors.password}</div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-row justify-evenly">
            <div className="m-2">
              <Link
                to="/std-reg"
                className="block mt-4 text-blue-500 hover:underline"
              >
                Sign up
              </Link>
            </div>
            <div className="m-2">
              <Link
                to="/master-login"
                className="block mt-4 text-blue-500 hover:underline"
              >
                Master
              </Link>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
}
