import React from "react";
import { useIntl } from "react-intl";
import { ArrowUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";

export const BookNavBtn: React.FC<{ book: Book; url?: string }> = ({
	book,
	url,
}) => {
	const intl = useIntl();
	const openInOtherTab = intl.formatMessage({
		id: "l/U6iS",
		defaultMessage: "Open in other tab",
	});
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
