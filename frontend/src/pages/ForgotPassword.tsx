import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailValidation } from "../constants/formValidation";
import { BASE_URL, createToast } from "../constants/utils";
import { ArrowLeft, CircleX, Loader, Mail } from "lucide-react";

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setEmail(data.email);
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
        email: data.email,
      });
      createToast("success", response.data.message);
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error: any) {
      setIsLoading(false);
      setIsSubmitted(false);
      console.log(error);
      createToast("error", error.response.data.message);
    }
  };
  return (
    <div className="bg-[#0d052c] md:w-1/2 lg:w-1/3 w-[95%] p-8 rounded-md">
      {!isSubmitted ? (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Forgot Password
          </h1>
          <p className="text-gray-400  font-medium mb-6 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <p className="error-message mt-3">
                <CircleX size={18} />
                <span>{errors.email.message}</span>
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`main-btn mt-6 w-full ${
                isLoading && "cursor-not-allowed opacity-50"
              }`}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="w-16 h-16 bg-[#1200ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-400 font-medium text-center mb-6">
            If an account exists for{" "}
            <span className="text-blue-600 font-semibold">{email}</span>, you
            will receive a password reset link shortly.
          </p>
        </div>
      )}
      <div className=" bg-gray-700 rounded-md py-2 mt-4 bg-opacity-50 flex justify-center">
        <Link
          to={"/login"}
          className=" font-medium text-lg gap-2 hover:underline  flex items-center"
        >
          <ArrowLeft size={24} /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
