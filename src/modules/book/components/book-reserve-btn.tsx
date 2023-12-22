import React from "react";
import { BookLockIcon } from "lucide-react";
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

export const BookReserveBtn: React.FC<{
	handler: NullaryHandler;
	book: Book;
}> = ({ handler, book }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:opacity-50 transition-opacity"
								onClick={handler}
							>
								<BookLockIcon className="text-primary" size={LG_ICON_SIZE} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Reserve</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirmation</AlertDialogTitle>
					<AlertDialogDescription>
						{`Do you wish to reserve "${book.title}"?`}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handler}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
