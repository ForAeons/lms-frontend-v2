import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PageNotFound: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className="flex justify-center">
			<div className="space-y-8 max-w-md w-full mx-3 flex flex-col gap-6">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					Page Not Found
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

export default PageNotFound;
