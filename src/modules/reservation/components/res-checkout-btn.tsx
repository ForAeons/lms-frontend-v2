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
import { BookRoutes, LoanRoutes, ResRoutes, reservationApi } from "@/api";
import { LG_ICON_SIZE } from "@/constants";

export const ResCheckoutBtn: React.FC<{ res: Reservation }> = ({ res }) => {
	const translate = useTranslations();
	const checkoutAction = translate.Checkout();
	const cancelAction = translate.Cancel();
	const confirmation = translate.Confirmation();
	const confirmationMessage = translate.checkoutResDesc();
	const continueAction = translate.Continue();

	const queryClient = useQueryClient();
	const checkoutResMutation = useMutation({
		mutationKey: [ResRoutes.BASE, ResRoutes.CHECKOUT.ROUTE, res.id],
		mutationFn: reservationApi.CheckoutRes,
		onSuccess: (data) => {
			const loan = data!.data;
			queryClient.invalidateQueries({ queryKey: [ResRoutes.BASE] });
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			queryClient.invalidateQueries({ queryKey: [LoanRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.checkoutResSuccessDesc({
					title: loan.book.title,
				}),
			});
		},
	});

	const handleCheckout = () => checkoutResMutation.mutate(res.id);

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
									<BookUserIcon size={LG_ICON_SIZE} className="text-primary" />
									<span className="sr-only">{checkoutAction}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{checkoutAction}</p>
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
						onClick={handleCheckout}
						disabled={checkoutResMutation.isPending}
					>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
