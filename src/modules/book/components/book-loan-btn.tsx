import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookUserIcon } from "lucide-react";
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

export const BookLoanBtn: React.FC<{ book: Book; copyID: number }> = ({
	book,
	copyID,
}) => {
	const translate = useTranslations();
	const borrowAction = translate.Borrow();
	const confirmation = translate.Confirmation();
	const confirmationMessage = translate.loanBookDesc({ title: book.title });
	const cancelAction = translate.Cancel();
	const continueAction = translate.Continue();

	const queryClient = useQueryClient();
	const loanBookMutation = useMutation({
		mutationKey: [BookRoutes.BASE, copyID, LoanRoutes.BASE],
		mutationFn: loanApi.LoanBook,
		onSuccess: (data) => {
			const loan = data!.data;

			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			queryClient.invalidateQueries({ queryKey: [LoanRoutes.BASE] });

			toast.success(translate.Success(), {
				description: translate.createLoanDesc({
					title: loan.book.title,
					username: loan.user.username,
				}),
			});
		},
	});

	const handleLoan = () => loanBookMutation.mutate(copyID);

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
									<BookUserIcon className="text-primary" size={LG_ICON_SIZE} />
									<span className="sr-only">{borrowAction}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{borrowAction}</p>
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
						onClick={handleLoan}
						disabled={loanBookMutation.isPending}
					>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
