import React from "react";
import { SigninForm } from "..";
import { Card, CardContent } from "@/components/ui/card";

export const LoginPage: React.FC = () => {
	return (
		<div className="w-full h-full relative">
			<Card className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 max-w-lg border-none transition-shadow shadow-md hover:shadow-lg">
				<CardContent className="p-6">
					<SigninForm />
				</CardContent>
			</Card>
		</div>
	);
};
