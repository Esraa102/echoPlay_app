import { User, Lock, Mail, Eye, EyeOff, CircleX, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../constants/formValidation";
import axios from "axios";
import { BASE_URL, createToast } from "../constants/utils";
import useAuthStore from "../store/authStore.ts";
import { GoogleAuthBtn } from "../components";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const [isVisible, setisVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      setUser(response.data.user);
      createToast("success", response.data.message);
      setIsLoading(false);
      navigate("/verify-email");
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      createToast("error", error.response.data.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden w-full flex">
      <img src="/assets/bg.png" alt="" className="w-1/2 object-cover h-full" />
      <div className="md:w-1/3 h-screen overflow-y-scroll flex items-center flex-col py-8 rounded-md flex-1 backdrop-filter px-8 ">
        <h1 className=" text-3xl font-bold my-4">Create New Account</h1>
        <p className="text-gray-400  font-medium">
          Welcome to EchoPlay, Please enter your information to create an
          account
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-8 w-full flex-col gap-6"
        >
          <div
            className={`input-container ${errors.username && "border-red-700"}`}
          >
            <User size={30} color={errors.username ? "#b91c1c" : "#fff"} />
            <input
              type="text"
              placeholder="Esraa Gamal"
              className="input"
              {...register("username", usernameValidation)}
            />
          </div>
          {errors.username && (
            <p className="error-message">
              <CircleX size={18} />
              <span>{errors.username.message}</span>
            </p>
          )}
          <div
            className={`input-container ${errors.email && "border-red-700"}`}
          >
            <Mail size={28} color={errors.email ? "#b91c1c" : "#fff"} />
            <input
              type="text"
              placeholder="esraa1920252023@gmail.com"
              className="input"
              {...register("email", emailValidation)}
            />
          </div>
          {errors.email && (
            <p className="error-message">
              <CircleX size={18} />
              <span>{errors.email.message}</span>
            </p>
          )}
          <div
            className={`input-container ${errors.password && "border-red-700"}`}
          >
            <Lock size={28} color={errors.password ? "#b91c1c" : "#fff"} />
            <input
              type={isVisible ? "text" : "password"}
              placeholder="••••••••••••••"
              className="input"
              {...register("password", passwordValidation)}
            />
            <button type="button" onClick={() => setisVisible(!isVisible)}>
              {isVisible ? <Eye color="#0f0" size={28} /> : <EyeOff />}
            </button>
          </div>
          {errors.password && (
            <p className="error-message">
              <CircleX size={18} />
              <span>{errors.password.message}</span>
            </p>
          )}
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`main-btn ${
                isLoading && "cursor-not-allowed opacity-50"
              }`}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Sign Up"
              )}
            </button>

            <GoogleAuthBtn />
          </div>
        </form>
        <p className="mt-3 text-center font-medium">
          Already have an account?{" "}
          <Link to={"/login"} className="hover:text-[#0f0] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

//
