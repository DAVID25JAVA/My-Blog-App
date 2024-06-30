import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth";
import { useForm } from "react-hook-form";
import { login } from "../../reduxStore/authSlice";
import Input from "../Input";
import Logo from "../Logo";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

export function Signup() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/login"); // Navigate to the login page
        }
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block max-w-[100px] w-32">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center my-8">
            <FadeLoader color="#36d7b7" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-2">
              <label htmlFor="" className="font-serif">
                Full Name
              </label>
              <Input
                className="mb-3"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
              <label htmlFor="" className="font-serif">
                Email :{" "}
              </label>
              <Input
                className="mb-3"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <label htmlFor="" className="font-serif">
                Password :{" "}
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
