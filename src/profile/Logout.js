import React, { useEffect } from "react";
import Auth from "@aws-amplify/auth";

const Logout = (props) => {
  useEffect(() => {
    localStorage.clear();
    Auth.signOut()
      .then((data) => {
        console.log(data);
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  }, []);

  return <div className="Logout_Debug">{/* Logging out */}</div>;
};

export default Logout;
