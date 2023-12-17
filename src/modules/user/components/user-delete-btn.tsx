import React from "react";
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
import { useAppDispatch, deleteUserThunk } from "@/store";
import { TrashIcon } from "lucide-react";
import { MD_ICON_SIZE } from "@/constants";

export const UserDeleteBtn: React.FC<{ userPerson: UserPerson }> = ({
	userPerson,
}) => {
	const dispatch = useAppDispatch();
	const handleClick = () => dispatch(deleteUserThunk(userPerson.id));

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
						This action cannot be undone. This will permanently delete this
						account and remove it from our servers.
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
