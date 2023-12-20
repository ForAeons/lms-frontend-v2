import React from "react";
import { TrashIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { deleteLoanThunk, useAppDispatch } from "@/store";
import { MD_ICON_SIZE } from "@/constants";

export const LoanDeleteBtn: React.FC<{ loan: Loan }> = ({ loan }) => {
	const dispatch = useAppDispatch();

	const handleDelete = () => dispatch(deleteLoanThunk({ loanId: loan.id }));

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button
					variant="ghost"
					className="hover:bg-transparent hover:opacity-50 transition-opacity"
				>
					<TrashIcon className="text-destructive" size={MD_ICON_SIZE} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this loan
						and remove it from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
