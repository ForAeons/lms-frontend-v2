import React from "react";
import { useIntl } from "react-intl";
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
	const intl = useIntl();
	const returnLabel = intl.formatMessage({
		id: "0WJNP/",
		defaultMessage: "Return",
	});

	const dispatch = useAppDispatch();
	const handleReturn = () => dispatch(returnLoanThunk({ loanId: loan.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleReturn}
					>
						<Undo2Icon size={LG_ICON_SIZE} className="text-primary" />
						<span className="sr-only">{returnLabel}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{returnLabel}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
