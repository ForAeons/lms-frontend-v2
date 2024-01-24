import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/language-provider";

export const ErrorPage: React.FC<{ errorMsg: string }> = ({ errorMsg }) => {
  const navigate = useNavigate();
  const translate = useTranslations();
  const goBack = translate.goBack();
  return (
    <div className="h-full w-full min-h-[80dvh] relative">
      <div className="max-w-md w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
          {errorMsg}
        </h1>

        <Button onClick={() => navigate(-1)} variant={"secondary"}>
          {goBack}
        </Button>
      </div>
    </div>
  );
};
