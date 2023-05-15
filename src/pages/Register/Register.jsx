import { updateProfile } from "firebase/auth";
import React, { useContext } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../../assets/images/login/login.svg";
import { AuthContext } from "../../providers/AuthProvider";
const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleToRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          Swal.fire({
            icon: "success",
            title: "Welcome",
            text: "Sign up Successfully",
          });
        }
        updateUserinfo(user, name);
        console.log(user);

        navigate("/");
      })
      .catch((error) => console.error(error.message));
  };

  //   update user information

  const updateUserinfo = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        // console.log("Updated Successfully");
      })
      .catch((error) => {
        // console.error(error.message);
      });
  };

  return (
    <div>
      <div className="lg:flex justify-between my-16">
        <div className="md:w-1/2 lg:pl-20 mx-auto px-12 mb-8">
          <img src={login} alt="" className="" />
        </div>
        <div className="card md:w-1/2 shadow-2xl bg-base-100 mx-auto">
          <div className="card-body sm:px-16 sm:pt-16">
            <form onSubmit={handleToRegister}>
              <div className="text-center mb-10">
                <h1 className="text-5xl font-bold">Sign Up</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="your name"
                  className="input input-bordered"
                  name="name"
                />
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
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn bg-[#ff0018] border-none text-xl capitalize hover:bg-red-600"
                />
              </div>
            </form>
            <div className="w-2/3 p-8 mx-auto text-center space-y-7">
              <h3 className="text-xl font-medium">Or Sign Up with</h3>

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
                Have an account?
                <Link to="/login" className="text-orange-500 font-medium">
                  {""} Sign In
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

export default Register;
