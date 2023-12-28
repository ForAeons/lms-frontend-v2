import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";
import { ArrowUpRightIcon } from "lucide-react";

export const BookNavBtn: React.FC<{ book: Book; url?: string }> = ({
	book,
	url,
}) => {
	const navigate = useNavigate();
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={() => navigate(url ?? `${book.id}`)}
					>
						<ArrowUpRightIcon size={LG_ICON_SIZE} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Open in another tab</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
