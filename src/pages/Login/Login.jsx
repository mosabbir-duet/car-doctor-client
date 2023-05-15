import React, { useContext } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../../assets/images/login/login.svg";
import { AuthContext } from "../../providers/AuthProvider";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";

  const handleToLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // const loggedUser = {
        //   email: user.email,
        // };
        // fetch("http://localhost:3000/jwt", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(loggedUser),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log("jwt response", data);
        //     // Warning: Local storage is not the best (second best place HTTP cookies) to store access token
        //     localStorage.setItem("car-access-token", data.token);
        //   });
        if (user) {
          Swal.fire({
            icon: "success",
            title: "Welcome",
            text: "Sign In Successfully",
          });
        }
        // navigate redirects
        navigate(from, { replace: true });
        console.log(user);
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div>
      <div className="lg:flex justify-between my-16">
        <div className="md:w-1/2 lg:pl-20 mx-auto px-12 mb-8">
          <img src={login} alt="" className="" />
        </div>
        <div className="card md:w-1/2 shadow-2xl bg-base-100 mx-auto">
          <div className="card-body sm:px-16 sm:pt-16">
            <form onSubmit={handleToLogin}>
              <div className="text-center mb-10">
                <h1 className="text-5xl font-bold">Login</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign In"
                  className="btn bg-[#ff0018] border-none text-xl capitalize hover:bg-red-600"
                />
              </div>
            </form>
            <div className="w-2/3 p-8 mx-auto text-center space-y-7">
              <h3 className="text-xl font-medium">Or Sign In with</h3>

              <div className="flex justify-center gap-4">
                <span className="bg-indigo-100 rounded-full p-3">
                  <FaFacebookF className="text-sky-600 text-xl"></FaFacebookF>
                </span>
                <span className="bg-indigo-100 rounded-full p-3">
                  <FaLinkedinIn className="text-blue-500 text-xl"></FaLinkedinIn>
                </span>
                <span className="bg-indigo-100 rounded-full p-3">
                  <FcGoogle className="text-cyan-500 text-xl"></FcGoogle>
                </span>
              </div>
              <p className="text-xl">
                New to Cars Doctor?
                <Link to="/signup" className="text-orange-500 font-medium">
                  {""} Sign Up
                </Link>
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
