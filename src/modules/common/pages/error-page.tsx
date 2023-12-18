import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ErrorPage: React.FC<{ errorMsg: string }> = ({ errorMsg }) => {
	const navigate = useNavigate();
	return (
		<div className="h-full w-full relative">
			<div className="max-w-md w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
				<h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
					{errorMsg}
				</h1>

				<Button
					onClick={() => navigate(-1)}
					variant={"secondary"}
					size={"default"}
				>
					Go Back
				</Button>
			</div>
		</div>
	);
};
