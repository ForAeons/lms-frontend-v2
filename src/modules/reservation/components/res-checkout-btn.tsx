import React from "react";
import { useIntl } from "react-intl";
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

export const ResCheckoutBtn: React.FC<{ res: Reservation }> = ({ res }) => {
	const intl = useIntl();
	const checkoutAction = intl.formatMessage({
		id: "BJ2TKX",
		defaultMessage: "Checkout",
	});
	const cancelAction = intl.formatMessage({
		id: "47FYwb",
		defaultMessage: "Cancel",
	});
	const confirmation = intl.formatMessage({
		id: "Pswssl",
		defaultMessage: "Confirmation",
	});
	const confirmationMessage = intl.formatMessage({
		id: "Xl12PH",
		defaultMessage: `Do you wish to checkout the book?`,
	});
	const continueAction = intl.formatMessage({
		id: "acrOoz",
		defaultMessage: "Continue",
	});

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
