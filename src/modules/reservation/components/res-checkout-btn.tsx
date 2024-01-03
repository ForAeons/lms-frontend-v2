import React from "react";
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
import { checkoutResThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";
import { useTranslations } from "@/components/language-provider";

export const ResCheckoutBtn: React.FC<{ res: Reservation }> = ({ res }) => {
	const translate = useTranslations();
	const checkoutAction = translate.Checkout();
	const cancelAction = translate.Cancel();
	const confirmation = translate.Confirmation();
	const confirmationMessage = translate.checkoutResDesc();
	const continueAction = translate.Continue();

	const dispatch = useAppDispatch();
	const handleCheckout = () => dispatch(checkoutResThunk({ resId: res.id }));
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
					<AlertDialogAction onClick={handleCheckout}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
