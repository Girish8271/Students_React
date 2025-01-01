import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BaseURL from "../API/API.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Making POST request to login API
      const response = await axios.post(`${BaseURL}/students/login`, {
        email,
        password,
      });

      if (response.data.success) {
        // On success, show success message
        toast.success("Login Successful!");

        // Redirect to students details page
        navigate("/studentsDetails");
      } else {
        // Show error if login failed
        toast.error("Login Failed! Please check your credentials.");
      }
    } catch (error) {
      // Show error toast for any errors in the API call
      toast.error(`Something went wrong! ${error.message}`);
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Set loading to false even when error occurs
    }
  };

  return (
    <>
      <section className="log-in-section background-image-2 section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/log-in.png"
                  className="img-fluid"
                  alt="Login Image"
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="card shadow-lg border-0 bg-light">
                <div className="card-body">
                  <div className="log-in-box">
                    <div className="log-in-title text-center">
                      <h3 className="text-dark">
                        Welcome To Students Dashboard
                      </h3>
                      <h4 className="text-muted">Log In Your Account</h4>
                    </div>
                    <div className="input-box mt-4">
                      <form className="row g-4" onSubmit={handleLogin}>
                        <div className="col-12">
                          <div className="form-floating theme-form-floating log-in-form">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Email Address"
                              value={email}
                              required
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email Address</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating theme-form-floating log-in-form">
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                          </div>
                        </div>
                        <div className="col-12 text-center">
                          <button
                            className="btn btn-primary w-50"
                            type="submit"
                            disabled={isLoading} // Disable the button while loading
                          >
                            {isLoading ? "Loading..." : "Log In"}{" "}
                            {/* Show loading text if loading */}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="sign-up-box text-center mt-4">
                      <h4>Don't have an account?</h4>
                      <Link to={"/"} className="text-primary">
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
