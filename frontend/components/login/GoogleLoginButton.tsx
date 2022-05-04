import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLoginRequest } from "../../api/user";

const GoogleLoginButton = () => {
  const onSuccess = useCallback((response: object) => {
    console.log(response);
    GoogleLoginRequest(
      JSON.stringify(response),
      ({ data }: any) => {
        console.log(response);

        const authorization = `Bearer ${data[0]}`;
        const refreshtoken = `Refresh Bearer ${data[1]}`;

        localStorage.setItem("authorization", authorization);
        localStorage.setItem("refreshtoken", refreshtoken);
      },
      (error: Error) => console.log(error)
    );
  }, []);

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      buttonText="Google 로그인"
      onSuccess={onSuccess}
      onFailure={(error) => console.log(error)}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
