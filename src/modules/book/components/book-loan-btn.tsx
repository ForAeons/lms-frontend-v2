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
import { LG_ICON_SIZE } from "@/constants";
import { loanBookThunk, useAppDispatch } from "@/store";

export const BookLoanBtn: React.FC<{ book: Book; copyID: number }> = ({
	book,
	copyID,
}) => {
	const dispatch = useAppDispatch();
	const handleLoan = () => dispatch(loanBookThunk({ bookCopyID: copyID }));
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
								<BookUserIcon className="text-primary" size={LG_ICON_SIZE} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Borrow</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirmation</AlertDialogTitle>
					<AlertDialogDescription>
						{`Do you wish to borrow "${book.title}"?`}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleLoan}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
