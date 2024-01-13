import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleOffIcon } from "lucide-react";
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
import { BookRoutes, ResRoutes, reservationApi } from "@/api";
import { LG_ICON_SIZE, TOOLTIP_DELAY } from "@/constants";

export const ResCancelBtn: React.FC<{ res: Reservation }> = ({ res }) => {
	const translate = useTranslations();
	const cancelAction = translate.Cancel();
	const confirmation = translate.Confirmation();
	const confirmationMessage = translate.cancelResDesc();
	const continueAction = translate.Continue();

	const queryClient = useQueryClient();
	const cancelResMutation = useMutation({
		mutationKey: [ResRoutes.BASE, ResRoutes.CANCEL.ROUTE, res.id],
		mutationFn: reservationApi.CancelRes,
		onSuccess: (data) => {
			const loan = data!.data;
			queryClient.invalidateQueries({ queryKey: [ResRoutes.BASE] });
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.cancelResSuccessDesc({
					title: loan.book.title,
				}),
			});
		},
	});

	const handleCancel = () => cancelResMutation.mutate(res.id);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div>
					<TooltipProvider delayDuration={TOOLTIP_DELAY}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									className="hover:bg-transparent hover:opacity-50 transition-opacity"
								>
									<CircleOffIcon
										size={LG_ICON_SIZE}
										className="text-destructive"
									/>
									<span className="sr-only">{cancelAction}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{cancelAction}</p>
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
						onClick={handleCancel}
						disabled={cancelResMutation.isPending}
					>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
