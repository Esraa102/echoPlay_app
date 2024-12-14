import { LeftBar, RightBar } from "../components";
import useAuthStore from "../store/authStore";

const Home = () => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <section>
      <LeftBar />
      <RightBar />
    </section>
  );
};

export default Home;
