import { KeyboardEvent, useRef, useState } from "react";
import useAuthStore from "../store/authStore";
import { CircleX, Loader } from "lucide-react";
import axios from "axios";
import { BASE_URL, createToast } from "../constants/utils";
import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex(
        (digit: string) => digit !== ""
      );
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;

      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
    if (newCode.join("").length < 6 || Number.isNaN(Number(newCode.join("")))) {
      setError("Invalid Verification Code");
    } else {
      setError("");
    }
  };
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSumbit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const verifyCode = code.join("");
    if (verifyCode.length < 6 || Number.isNaN(Number(verifyCode))) {
      setError("Invalid Verification Code");
    } else {
      setError("");
      try {
        const response = await axios.post(`${BASE_URL}/auth/verify-email`, {
          code: verifyCode,
        });
        setIsLoading(false);
        setUser(response.data.user);
        createToast("success", response.data.message);
        navigate("/");
      } catch (error: any) {
        setIsLoading(false);
        console.log(error);
        if (error.response.status === 400) {
          setShowResend(true);
        }
        createToast("error", error.response.data.message);
      }
    }
  };
  const resendCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/resend-code`, {
        email: user?.email,
      });
      setIsLoading(false);
      console.log(response);
      createToast("success", response.data.message);
      setCode(["", "", "", "", "", ""]);
      setShowResend(false);
    } catch (error: any) {
      setIsLoading(false);
      createToast("error", error.response.data.message);
    }
  };
  return (
    <div className="bg-[#0d052c] md:w-1/2 lg:w-1/3 w-[95%] p-8 rounded-md">
      {!showResend ? (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Verify your account
          </h1>
          <form
            onSubmit={handleSumbit}
            className="flex flex-col mt-10 gap-8 justify-center flex-nowrap"
          >
            <div className="flex gap-4 justify-center flex-nowrap">
              {code.map((item, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  value={item}
                  type="text"
                  maxLength={6}
                  className="verify-input"
                />
              ))}
            </div>
            {error && (
              <p className="error-message">
                <CircleX size={18} />
                <span>{error}</span>
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`main-btn ${
                isLoading && "cursor-not-allowed opacity-60"
              }`}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Verify Account"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl  py-2 font-bold text-center mb-4">
            Invalid or expired code
          </h1>
          <p className="my-2 font-semibold text-center text-gray-400 text-lg">
            We will send an another verification code to{" "}
            <span className="text-[#1200ff]">{user?.email}</span>
          </p>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => resendCode()}
            className={`main-btn mt-6 w-full ${
              isLoading && "cursor-not-allowed opacity-60"
            }`}
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              "Send Code Again"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
