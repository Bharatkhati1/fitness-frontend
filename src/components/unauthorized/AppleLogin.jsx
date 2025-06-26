import React from "react";
import AppleLogin from "react-apple-login";
import AppleIcon from "../../../public/assets/img/AppleIcon.png";

const AppleLoginButton = () => {
  const handleAppleResponse = (response) => {
    console.log("Apple login response:", response);
  };

  return (
    <div>
      <AppleLogin
        clientId="YOUR_CLIENT_ID"
        redirectURI="YOUR_REDIRECT_URI"
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
