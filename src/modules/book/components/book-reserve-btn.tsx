import React from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LockKeyholeIcon } from "lucide-react";
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
import { useAppSelector } from "@/store";
import { newUserCollectionQuery } from "@/util";

export const BookReserveBtn: React.FC<{ book: Book; copies: BookCopy[] }> = ({
	book,
	copies,
}) => {
	const user = useAppSelector((state) => state.app.user);
	const translate = useTranslations();

	const cq = newUserCollectionQuery(user?.id, "pending");
	const { data } = useQuery({
		enabled: !!user?.id,
		queryKey: [ResRoutes.BASE, cq],
		queryFn: ({ signal }) => reservationApi.ListRes(cq, signal),
	});
	const userHasReserved = data?.data.find((r) => r.book.id === book.id);

	const availCopy = copies.find((bc) => bc.status === "available");
	const queryClient = useQueryClient();
	const reserveBookMutation = useMutation({
		mutationKey: [BookRoutes.BASE, availCopy?.id, ResRoutes.BASE],
		mutationFn: reservationApi.ReserveBook,
		onSuccess: (data) => {
			const loan = data!.data;

			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			queryClient.invalidateQueries({ queryKey: [ResRoutes.BASE] });

			toast.success(translate.Success(), {
				description: translate.createResDesc({
					title: loan.book.title,
					username: loan.user.username,
				}),
			});
		},
	});

	const handleRes = () => reserveBookMutation.mutate(availCopy!.id);

	const reserveAction = translate.Reserve();
	const confirmation = translate.Confirmation();
	const confirmationMessage = translate.reserveBookDesc({
		title: book.title,
	});
	const cancelAction = translate.Cancel();
	const continueAction = translate.Continue();

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
									disabled={!availCopy || !!userHasReserved}
								>
									<LockKeyholeIcon
										className="text-primary"
										size={LG_ICON_SIZE}
									/>
									<span className="sr-only">{reserveAction}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{reserveAction}</p>
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
						onClick={handleRes}
						disabled={reserveBookMutation.isPending}
					>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
