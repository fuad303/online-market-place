import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);

  if (!user) return <p className="text-white">لطفا وارد اکانت خود بشید</p>;
  return (
    <div className="text">
      <p>Welcome: {user.username}</p>
    </div>
  );
};

export default Home;
