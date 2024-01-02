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
import { useIntl } from "react-intl";

export const CreateBtn: React.FC<{
	handler?: NullaryHandler;
	subject: string;
}> = ({ handler, subject }) => {
	const intl = useIntl();
	const addNew = intl.formatMessage(
		{ id: "HNHwk3", defaultMessage: "Add new {subject}" },
		{ subject },
	);

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
						<span className="sr-only">{addNew}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{addNew}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
