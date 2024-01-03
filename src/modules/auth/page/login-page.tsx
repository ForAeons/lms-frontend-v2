import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/hooks";
import { SigninForm } from "..";

export const SigninPage: React.FC = () => {
	const translate = useTranslations();
	const dontHaveAnAccount = translate["dontHaveAcc"]();
	const signUpHere = translate["signUpHere"]();

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center">
			<div className="max-w-lg m-6">
				<Card className="border-none transition-shadow shadow-md hover:shadow-lg">
					<CardContent className="p-6">
						<SigninForm />
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
