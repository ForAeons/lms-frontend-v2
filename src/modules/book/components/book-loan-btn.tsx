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
import { LG_ICON_SIZE } from "@/constants";
import { loanBookThunk, useAppDispatch } from "@/store";

export const BookLoanBtn: React.FC<{ book: Book; copyID: number }> = ({
	book,
	copyID,
}) => {
	const intl = useIntl();
	const borrowAction = intl.formatMessage({
		id: "6dn1ux",
		defaultMessage: "Borrow",
	});
	const confirmation = intl.formatMessage({
		id: "Pswssl",
		defaultMessage: "Confirmation",
	});
	const confirmationMessage = intl.formatMessage(
		{
			id: "jXzYxr",
			defaultMessage: `Do you wish to borrow "{title}"?`,
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
	const handleLoan = () => dispatch(loanBookThunk({ bookCopyID: copyID }));
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
					<AlertDialogAction onClick={handleLoan}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
