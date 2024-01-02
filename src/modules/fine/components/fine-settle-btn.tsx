import React from "react";
import { useIntl } from "react-intl";
import { BanknoteIcon } from "lucide-react";
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
import { settleFineThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const FineSettleBtn: React.FC<{ fine: Fine }> = ({ fine }) => {
	const intl = useIntl();
	const settle = intl.formatMessage({
		id: "mPKS81",
		defaultMessage: "Settle",
	});
	const confirmation = intl.formatMessage({
		id: "Pswssl",
		defaultMessage: "Confirmation",
	});
	const confirmationMessage = intl.formatMessage({
		id: "4rGuOk",
		defaultMessage: `Do you wish to settle the fine?`,
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
	const handleRenew = () => dispatch(settleFineThunk({ fineId: fine.id }));
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
									<BanknoteIcon size={LG_ICON_SIZE} className="text-primary" />
									<span className="sr-only">{settle}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{settle}</p>
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
