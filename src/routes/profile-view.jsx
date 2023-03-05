import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Profile from "../components/profile";

export default function ProfileView() {
  const token = useAppSelector((state) => state.users.token);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token === 0) {
      navigate("/", { replace: true });
    }
  }, []);
  return <Profile />;
}
