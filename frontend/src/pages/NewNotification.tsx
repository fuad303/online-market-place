import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NewNotification = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return <div>Make notification here</div>;
};

export default NewNotification;
