import React from "react";
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
import { cancelResThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";
import { useTranslations } from "@/hooks";

export const ResCancelBtn: React.FC<{ res: Reservation }> = ({ res }) => {
	const translate = useTranslations();
	const cancelAction = translate["Cancel"]();
	const confirmation = translate["Confirmation"]();
	const confirmationMessage = translate["cancelResDesc"]();
	const continueAction = translate["Continue"]();

	const dispatch = useAppDispatch();
	const handleCancel = () => dispatch(cancelResThunk({ resId: res.id }));
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
					<AlertDialogAction onClick={handleCancel}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
