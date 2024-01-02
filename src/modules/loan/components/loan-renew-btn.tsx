import React from "react";
import { useIntl } from "react-intl";
import { BookCopyIcon } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
	const confirmation = intl.formatMessage({
		id: "Pswssl",
		defaultMessage: "Confirmation",
	});
	const confirmationMessage = intl.formatMessage({
		id: "bva7X2",
		defaultMessage: `Do you wish to renew the loan?`,
	});
	const cancelAction = intl.formatMessage({
		id: "47FYwb",
		defaultMessage: "Cancel",
	});
	const continueAction = intl.formatMessage({
		id: "acrOoz",
		defaultMessage: "Continue",
	});

	const dispatch = useAppDispatch();
	const handleRenew = () => dispatch(renewLoanThunk({ loanId: loan.id }));
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									className="hover:bg-transparent hover:opacity-50 transition-opacity"
								>
									<BookCopyIcon size={LG_ICON_SIZE} className="text-primary" />
									<span className="sr-only">{renew}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{renew}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{confirmation}</AlertDialogTitle>
					<AlertDialogDescription>{confirmationMessage}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelAction}</AlertDialogCancel>
					<AlertDialogAction onClick={handleRenew}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
