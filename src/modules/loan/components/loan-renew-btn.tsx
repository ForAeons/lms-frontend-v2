import React from "react";
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
import { useTranslations } from "@/hooks";

export const LoanRenewBtn: React.FC<{ loan: Loan }> = ({ loan }) => {
	const translate = useTranslations();
	const renew = translate["Renew"]();
	const confirmation = translate["Confirmation"]();
	const confirmationMessage = translate["renewLoanDesc"]();
	const cancelAction = translate["Cancel"]();
	const continueAction = translate["Continue"]();

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
