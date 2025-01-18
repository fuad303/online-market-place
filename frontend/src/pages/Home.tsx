import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const send = async () => {
    const res = await axios.post(
      "http://localhost:4000/update/userProfile/678b5a80562b0cb062328a2e",
      {
        username: "fuadddd",
      }
    );
    console.log(res);
  };
  useEffect(() => {
    send();
  }, []);
  if (!user) return <p className="text-white">لطفا وارد اکانت خود بشید</p>;
  return (
    <div className="text">
      <p>Welcome: {user.username}</p>
    </div>
  );
};

export default Home;
