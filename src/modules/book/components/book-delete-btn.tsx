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
import { useAppDispatch } from "@/store";
import { deleteBookThunk } from "@/store/thunks/book-thunk";
import { MD_ICON_SIZE } from "@/constants";

export const BookDeleteBtn: React.FC<{ book: Book }> = ({ book }) => {
	const dispatch = useAppDispatch();
	const handleClick = () => dispatch(deleteBookThunk({ bookID: book.id }));

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button variant="ghost" className="rounded-full">
					<TrashIcon className="text-destructive" size={MD_ICON_SIZE} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this book
						and remove it from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};