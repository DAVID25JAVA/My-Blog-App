import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/Auth";
import { login as authLogin } from "../../reduxStore/authSlice";
import Logo from "../Logo";
import Button from "../Button";
import { Link } from "react-router-dom";
import Input from "../Input";
import { FadeLoader } from "react-spinners";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const login = async (data) => {
    setError("");
    setLoader(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          setLoader(false);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      setLoader(false); // Reset the loader state on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <div className="mx-auto w-full max-w-md bg-gray-100 rounded-xl p-6 sm:p-10 border border-black/10">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        {loader ? (
          <div className="flex justify-center mt-5">
            <FadeLoader color="#36d7b7" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(login)}>
            <label htmlFor="" className="font-serif">
              Email :{" "}
            </label>
            <Input
              placeholder="Enter your email"
              className="mb-5"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
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
            <Button className="w-full mt-7" type="submit">
              Sign in
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
