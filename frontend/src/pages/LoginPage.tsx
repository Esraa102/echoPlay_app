import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthStore from "../store/authStore";
import { emailValidation } from "../constants/formValidation";
import { BASE_URL, createToast } from "../constants/utils";
import { CircleX, Eye, EyeOff, Mail, Lock, Loader } from "lucide-react";
import { GoogleAuthBtn } from "../components";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      setIsLoading(false);
      setUser(response.data.user);
      createToast("success", response.data.message);
      navigate("/");
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      createToast("error", error.response.data.message);
    }
  };
  return (
    <section className="h-screen w-full overflow-hidden flex">
      <div className="md:w-1/2 h-screen flex items-center flex-col py-8 rounded-md flex-1 backdrop-filter px-8 ">
        <h1 className="text-4xl font-bold my-4">Log In</h1>
        <p className="text-gray-400  font-medium">
          Welcome Back to EchoPlay,We're happy to see you again!
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex md:w-[90%] mt-8 w-full flex-col gap-6"
        >
          <div
            className={`input-container ${errors.email && "border-red-700"}`}
          >
            <Mail size={30} color={errors.email ? "#b91c1c" : "#fff"} />
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
              {...register("password", {
                required: {
                  value: true,
                  message: "Passwor is required",
                },
              })}
            />
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? <Eye color="#0f0" size={28} /> : <EyeOff />}
            </button>
          </div>
          {errors.password && (
            <p className="error-message">
              <CircleX size={18} />
              <span>{errors.password.message}</span>
            </p>
          )}
          <div className="flex justify-end -my-3">
            <Link
              className="text-lg font-semibold text-green-500 transition hover:underline hover:text-[#0f0]"
              to={"/forgot-password"}
            >
              Forgot Password?
            </Link>
          </div>
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
                "Log In"
              )}
            </button>

            <GoogleAuthBtn />
          </div>
        </form>
        <p className="mt-3 text-center font-medium">
          Don't have an account?{" "}
          <Link to={"/sign-up"} className="hover:text-[#0f0] hover:underline">
            Create One!
          </Link>
        </p>
      </div>
      <img src="/assets/bg3.png" alt="" className="w-1/2 object-cover" />
    </section>
  );
};

export default LoginPage;
