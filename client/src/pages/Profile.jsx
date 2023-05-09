import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNavigation from "../Components/AccountNavigation";
import { UserContext } from "../hooks/UserContext";
import Places from "./Places";

const Profile = () => {
  let { subpage } = useParams();

  const { ready, user, setUser } = useContext(UserContext);

  const [redirect, setRedirect] = useState(false);

  if (ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  // LOGOUT USER
  async function logout() {
    await axios.post("/auth/logout");
    setRedirect(true);
    setUser(null);
  }
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AccountNavigation />

      {subpage === undefined && (
        <div className="text-center max-w-lg mx-auto">
          <p>
            Logged in as {user.name} ( {user.email} )
          </p>
          <button className="primary max-w-md mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <Places />}
    </div>
  );
};

export default Profile;
