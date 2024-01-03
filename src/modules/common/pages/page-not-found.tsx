import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks";

export const PageNotFound: React.FC = () => {
	const navigate = useNavigate();
	const translate = useTranslations();
	const pageNotFound = translate["Mz/gsa"]();
	const goBack = translate["ekfOaV"]();
	return (
		<div className="h-full w-full relative">
			<div className="max-w-md w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
				<h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
					{pageNotFound}
				</h1>

				<Button onClick={() => navigate(-1)} variant={"secondary"}>
					{goBack}
				</Button>
			</div>
		</div>
	);
};
