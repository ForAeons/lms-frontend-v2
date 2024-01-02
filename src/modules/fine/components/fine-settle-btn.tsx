import React from "react";
import { useIntl } from "react-intl";
import { BanknoteIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { settleFineThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const FineSettleBtn: React.FC<{ fine: Fine }> = ({ fine }) => {
	const intl = useIntl();
	const settle = intl.formatMessage({
		id: "mPKS81",
		defaultMessage: "Settle",
	});

	const dispatch = useAppDispatch();
	const handleRenew = () => dispatch(settleFineThunk({ fineId: fine.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleRenew}
					>
						<BanknoteIcon size={LG_ICON_SIZE} className="text-primary" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{settle}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
