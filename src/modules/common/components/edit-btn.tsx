import React from "react";
import { useIntl } from "react-intl";
import { PencilIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";

export const EditBtn: React.FC<{ handler?: NullaryHandler }> = ({
	handler,
}) => {
	const intl = useIntl();
	const edit = intl.formatMessage({ id: "wEQDC6", defaultMessage: "Edit" });
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handler}
					>
						<PencilIcon className="text-primary" size={LG_ICON_SIZE} />
						<span className="sr-only">{edit}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{edit}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
