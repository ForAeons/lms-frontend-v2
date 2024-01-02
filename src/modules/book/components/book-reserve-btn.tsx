import React from "react";
import { useIntl } from "react-intl";
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
import { LG_ICON_SIZE } from "@/constants";
import { reserveBookThunk, useAppDispatch } from "@/store";

export const BookReserveBtn: React.FC<{ book: Book; copyID: number }> = ({
	book,
	copyID,
}) => {
	const intl = useIntl();
	const reserveAction = intl.formatMessage({
		id: "PCjq1b",
		defaultMessage: "Reserve",
	});
	const confirmation = intl.formatMessage({
		id: "Pswssl",
		defaultMessage: "Confirmation",
	});
	const confirmationMessage = intl.formatMessage(
		{
			id: "Yvzv3+",
			defaultMessage: `Do you wish to reserve "{title}"?`,
		},
		{ title: book.title },
	);
	const cancelAction = intl.formatMessage({
		id: "47FYwb",
		defaultMessage: "Cancel",
	});
	const continueAction = intl.formatMessage({
		id: "acrOoz",
		defaultMessage: "Continue",
	});

	const dispatch = useAppDispatch();
	const handleRes = () => dispatch(reserveBookThunk({ bookCopyID: copyID }));
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:opacity-50 transition-opacity"
							>
								<LockKeyholeIcon className="text-primary" size={LG_ICON_SIZE} />
								<span className="sr-only">{reserveAction}</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{reserveAction}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{confirmation}</AlertDialogTitle>
					<AlertDialogDescription>{confirmationMessage}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelAction}</AlertDialogCancel>
					<AlertDialogAction onClick={handleRes}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
