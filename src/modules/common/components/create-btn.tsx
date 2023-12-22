import React from "react";
import { PlusIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";

export const CreateBtn: React.FC<{
	handler?: NullaryHandler;
	subject: string;
}> = ({ handler, subject }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handler}
					>
						<PlusIcon size={LG_ICON_SIZE} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{`Add new ${subject}`}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
