import React from "react";
import { useIntl } from "react-intl";
import { CircleOffIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cancelResThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const ResCancelBtn: React.FC<{ res: Reservation }> = ({ res }) => {
	const intl = useIntl();
	const cancelAction = intl.formatMessage({
		id: "47FYwb",
		defaultMessage: "Cancel",
	});

	const dispatch = useAppDispatch();
	const handleCancel = () => dispatch(cancelResThunk({ resId: res.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleCancel}
					>
						<CircleOffIcon size={LG_ICON_SIZE} className="text-destructive" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{cancelAction}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
