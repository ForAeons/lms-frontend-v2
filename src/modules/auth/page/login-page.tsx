import React from "react";
import { SigninForm } from "..";
import { Card, CardContent } from "@/components/ui/card";

export const SigninPage: React.FC = () => {
	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center">
			<div className="max-w-lg m-6">
				<Card className="border-none transition-shadow shadow-md hover:shadow-lg">
					<CardContent className="p-6">
						<SigninForm />
					</CardContent>
				</Card>

				<div className="mt-3 text-xs text-muted-foreground text-right">
					<p>{"Don't have an account?"}</p>
					<p>
						Sign up{" "}
						<a
							href="/signup"
							className="text-primary hover:opacity-70 transition-colors"
						>
							here
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};
