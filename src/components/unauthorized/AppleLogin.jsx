import React from "react";
import AppleLogin from "react-apple-login";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";
import { jwtDecode } from "jwt-decode";
import { APPLE_CLIENT_ID, redirect_url } from "../../utils/constants";

const AppleLoginButton = ({handleSocialLoginGoogle}) => {
  const handleAppleResponse = (response) => {
    const decoded = jwtDecode(response.authorization.id_token);
    handleSocialLoginGoogle(decoded)
  };

  return (
    <div>
      <AppleLogin
        clientId={APPLE_CLIENT_ID}
        redirectURI={redirect_url}
        usePopup={true}
        callback={handleAppleResponse}
        scope="email name"
        responseMode="query"
        render={(renderProps) => (
          <a className="w-100" onClick={renderProps.onClick}>
            <img src={AppleIcon} alt="Apple icon" />
            login using apple
          </a>
        )}
      />
    </div>
  );
};

export default AppleLoginButton;
