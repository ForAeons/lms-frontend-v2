import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useTranslations } from "@/components/language-provider";
import { LoanRoutes, loanApi } from "@/api";
import { LG_ICON_SIZE } from "@/constants";

export const LoanRenewBtn: React.FC<{ loan: Loan }> = ({ loan }) => {
	const translate = useTranslations();
	const renew = translate.Renew();
	const confirmation = translate.Confirmation();
	const confirmationMessage = translate.renewLoanDesc();
	const cancelAction = translate.Cancel();
	const continueAction = translate.Continue();

	const queryClient = useQueryClient();
	const renewLoanMutation = useMutation({
		mutationKey: [LoanRoutes.BASE, LoanRoutes.RENEW.ROUTE, loan.id],
		mutationFn: loanApi.RenewLoan,
		onSuccess: (data) => {
			const loan = data!.data;
			queryClient.invalidateQueries({ queryKey: [LoanRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.renewLoanSuccessDesc({
					title: loan.book.title,
				}),
			});
		},
	});

	const handleRenew = () => renewLoanMutation.mutate(loan.id);

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
					<AlertDialogAction
						onClick={handleRenew}
						disabled={renewLoanMutation.isPending}
					>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
