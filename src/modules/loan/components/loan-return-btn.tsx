import React from "react";
import { useIntl } from "react-intl";
import { Undo2Icon } from "lucide-react";
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
import { returnLoanThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const LoanReturnBtn: React.FC<{ loan: Loan }> = ({ loan }) => {
	const intl = useIntl();
	const returnLabel = intl.formatMessage({
		id: "0WJNP/",
		defaultMessage: "Return",
	});
	const confirmation = intl.formatMessage({
		id: "Pswssl",
		defaultMessage: "Confirmation",
	});
	const confirmationMessage = intl.formatMessage({
		id: "IfPris",
		defaultMessage: `Do you wish to return the book?`,
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
	const handleReturn = () => dispatch(returnLoanThunk({ loanId: loan.id }));
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
									<Undo2Icon size={LG_ICON_SIZE} className="text-primary" />
									<span className="sr-only">{returnLabel}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{returnLabel}</p>
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
					<AlertDialogAction onClick={handleReturn}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
