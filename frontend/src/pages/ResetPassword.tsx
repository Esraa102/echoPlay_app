import { CircleX, Eye, EyeOff, Loader, Lock, LockKeyhole } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordValidation } from "../constants/formValidation";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, createToast } from "../constants/utils";
import axios from "axios";
import useAuthStore from "../store/authStore";

type Inputs = {
  password: string;
  confirm: string;
};
const ResetPassword = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResed, setShowResed] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const password = watch("password");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password/${token}`,
        { newPassword: data.password }
      );
      setIsLoading(false);
      setUser(response.data.user);
      createToast("success", response.data.message);
      navigate("/login");
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      if (error.response.status === 400) {
        setShowResed(true);
      }
      createToast("error", error.response.data.message);
    }
  };
  return (
    <div className="bg-[#0d052c] md:w-1/2 lg:w-1/3 w-[95%] p-8 rounded-md">
      {!showResed ? (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Reset Your Password
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex mt-10 flex-col gap-6"
          >
            <div
              className={`input-container ${
                errors.password && "border-red-700"
              }`}
            >
              <Lock size={28} color={errors.password ? "#b91c1c" : "#fff"} />
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your new password"
                className="input"
                {...register("password", passwordValidation)}
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
            <div
              className={`input-container ${
                errors.confirm && "border-red-700"
              }`}
            >
              <LockKeyhole
                size={28}
                color={errors.confirm ? "#b91c1c" : "#fff"}
              />
              <input
                type={isConfirm ? "text" : "password"}
                placeholder="Enter password again"
                className="input"
                {...register("confirm", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password ||
                    "Password and confirm password do not match",
                })}
              />
              <button type="button" onClick={() => setIsConfirm(!isConfirm)}>
                {isConfirm ? <Eye color="#0f0" size={28} /> : <EyeOff />}
              </button>
            </div>
            {errors.confirm && (
              <p className="error-message">
                <CircleX size={18} />
                <span>{errors.confirm.message}</span>
              </p>
            )}
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
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Reset link is invalid or expired
          </h1>
          <p className="text-center text-gray-400 font-medium">
            We'll send you another reset link via email. Please check your
            inbox.
          </p>
          <Link
            className="main-btn mt-8 w-full block text-center"
            to={"/forgot-password"}
          >
            Send link again
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
