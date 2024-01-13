import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE, TOOLTIP_DELAY } from "@/constants";
import { useTranslations } from "@/components/language-provider";

export const BookNavBtn: React.FC<{ book: Book; url?: string }> = ({
	book,
	url,
}) => {
	const navigate = useNavigate();
	const translate = useTranslations();
	const openInOtherTab = translate.openInOtherTab();
	return (
		<TooltipProvider delayDuration={TOOLTIP_DELAY}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={() => navigate(url ?? `${book.id}`)}
					>
						<ArrowUpRightIcon size={LG_ICON_SIZE} />
						<span className="sr-only">{openInOtherTab}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{openInOtherTab}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
