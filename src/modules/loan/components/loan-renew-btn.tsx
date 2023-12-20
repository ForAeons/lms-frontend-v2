import React from "react";
import { ListPlusIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { renewLoanThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const LoanRenewBtn: React.FC<{ loan: Loan }> = ({ loan }) => {
	const dispatch = useAppDispatch();
	const handleRenew = () => dispatch(renewLoanThunk({ loanId: loan.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleRenew}
					>
						<ListPlusIcon size={LG_ICON_SIZE} className="text-primary" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Renew</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
