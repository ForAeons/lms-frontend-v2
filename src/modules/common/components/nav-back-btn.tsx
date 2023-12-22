import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftToLineIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";

export const NavBackBtn: React.FC = () => {
	const navigate = useNavigate();
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={() => navigate(-1)}
					>
						<ArrowLeftToLineIcon size={LG_ICON_SIZE} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Back</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
