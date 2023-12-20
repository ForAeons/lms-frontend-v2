import React from "react";
import { Undo2Icon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { returnLoanThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const LoanReturnBtn: React.FC<{ loan: Loan }> = ({ loan }) => {
	const dispatch = useAppDispatch();
	const handleReturn = () => dispatch(returnLoanThunk({ loanId: loan.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleReturn}
					>
						<Undo2Icon size={LG_ICON_SIZE} className="text-primary" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Return</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
