import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/language-provider";

export const PleaseLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const translate = useTranslations();
  const pleaseSignIn = translate.pleaseSignIn();
  const SignIn = translate.signIn();
  const SignUp = translate.Signup();
  return (
    <div className="h-full w-full min-h-[50dvh] relative">
      <div className="max-w-md w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
          {pleaseSignIn}
        </h1>

        <div className="w-full flex justify-around">
          <Button onClick={() => navigate("/signin")} variant={"secondary"}>
            {SignIn}
          </Button>
          <Button onClick={() => navigate("/signup")} variant={"secondary"}>
            {SignUp}
          </Button>
        </div>
      </div>
    </div>
  );
};
