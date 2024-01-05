import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useTranslations } from "@/components/language-provider";
import { BookRoutes, LoanRoutes, loanApi } from "@/api";
import { LG_ICON_SIZE } from "@/constants";

export const LoanReturnBtn: React.FC<{ loan: Loan }> = ({ loan }) => {
	const translate = useTranslations();
	const returnLabel = translate.Return();
	const confirmation = translate.Confirmation();
	const confirmationMessage = translate.returnBookDesc();
	const cancelAction = translate.Cancel();
	const continueAction = translate.Continue();

	const queryClient = useQueryClient();
	const returnLoanMutation = useMutation({
		mutationKey: [LoanRoutes.BASE, LoanRoutes.RETURN.ROUTE, loan.id],
		mutationFn: loanApi.ReturnLoan,
		onSuccess: (data) => {
			const loan = data!.data;
			queryClient.invalidateQueries({ queryKey: [LoanRoutes.BASE] });
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.returnLoanSuccessDesc({
					title: loan.book.title,
				}),
			});
		},
	});

	const handleReturn = () => returnLoanMutation.mutate(loan.id);

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
