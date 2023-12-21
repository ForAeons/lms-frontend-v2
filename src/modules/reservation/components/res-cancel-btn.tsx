import React from "react";
import { XIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cancelResThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const ResCancelBtn: React.FC<{ res: ReservationDetailed }> = ({
	res,
}) => {
	const dispatch = useAppDispatch();
	const handleCancel = () => dispatch(cancelResThunk({ resId: res.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleCancel}
					>
						<XIcon size={LG_ICON_SIZE} className="text-destructive" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Cancel</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
