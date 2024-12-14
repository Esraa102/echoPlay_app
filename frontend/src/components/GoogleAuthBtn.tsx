import { BASE_URL } from "../constants/utils";

const GoogleAuthBtn = () => {
  const handleGoogleAuth = async () => {
    window.open(`${BASE_URL}/passport/auth/google`, "_self");
  };
  return (
    <button
      type="button"
      onClick={() => handleGoogleAuth()}
      className="main-btn flex justify-center gap-2 px-4 items-center hover:bg-blue-800/70 bg-blue-800"
    >
      <img src="/assets/google.png" alt="google-logo" width={30} />
      <span>Continue With Google</span>
    </button>
  );
};

export default GoogleAuthBtn;
