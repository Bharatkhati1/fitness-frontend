import React from "react";
import AppleLogin from "react-apple-login";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";
import { jwtDecode } from "jwt-decode";

const AppleLoginButton = ({handleSocialLoginGoogle}) => {
  const handleAppleResponse = (response) => {
    console.log("Apple login response:", response);
    const decoded = jwtDecode(response.authorization.id_token);
    console.log("decoded", decoded);
    handleSocialLoginGoogle(decoded)
  };

  return (
    <div>
      <AppleLogin
        clientId="com.thedailyfitness.web.login"
        redirectURI="https://daily-fitness.24livehost.com/login-user"
        usePopup={true}
        callback={handleAppleResponse}
        scope="email name"
        responseMode="query"
        render={(renderProps) => (
          <a onClick={renderProps.onClick}>
            <img src={AppleIcon} alt="Apple icon" />
            login using apple
          </a>
        )}
      />
    </div>
  );
};

export default AppleLoginButton;
