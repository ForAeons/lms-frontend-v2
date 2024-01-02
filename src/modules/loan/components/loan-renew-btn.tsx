import React from "react";
import { useIntl } from "react-intl";
import { BookCopyIcon } from "lucide-react";
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
	const intl = useIntl();
	const renew = intl.formatMessage({
		id: "nWQFic",
		defaultMessage: "Renew",
	});

	const dispatch = useAppDispatch();
	const handleRenew = () => dispatch(renewLoanThunk({ loanId: loan.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleRenew}
					>
						<BookCopyIcon size={LG_ICON_SIZE} className="text-primary" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{renew}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
