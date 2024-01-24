import React from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/components/language-provider";
import { appSlice, useAppDispatch } from "@/store";
import { AuthRoutes, authApi } from "@/api";
import { SigninForm } from "..";

export const SigninPage: React.FC = () => {
  const translate = useTranslations();
  const dontHaveAnAccount = translate.dontHaveAcc();
  const signUpHere = translate.signUpHere();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signInMutation = useMutation({
    mutationKey: [AuthRoutes.BASE, AuthRoutes.SIGN_IN.ROUTE],
    mutationFn: authApi.SignIn,
    onSuccess: (data) => {
      navigate("/");
      dispatch(appSlice.actions.setSignin(data!.data));
    },
    onError: () => {
      toast.error(translate.signInFailedMsg(), {
        description: translate.signInFailedDesc(),
      });
    },
  });

  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center">
      <div className="max-w-lg m-6">
        <Card className="border-none transition-shadow shadow-md hover:shadow-lg">
          <CardContent className="p-6">
            <SigninForm
              onSubmit={signInMutation.mutate}
              disabled={signInMutation.isPending}
            />
          </CardContent>
        </Card>

        <div className="mt-3 text-xs text-muted-foreground text-right">
          <p>{dontHaveAnAccount}</p>
          <a
            href="/signup"
            className="text-primary hover:opacity-70 transition-colors"
          >
            {signUpHere}
          </a>
        </div>
      </div>
    </div>
  );
};
