import React from "react";
import { TrashIcon } from "lucide-react";
import { useIntl } from "react-intl";
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

export const DeleteBtn: React.FC<{
	handler?: NullaryHandler;
	subject: string;
}> = ({ handler, subject }) => {
	const intl = useIntl();
	const deleteAction = intl.formatMessage({
		id: "K3r6DQ",
		defaultMessage: "Delete",
	});
	const deleteAlertTitle = intl.formatMessage({
		id: "v5ykbS",
		defaultMessage: "Are you absolutely sure?",
	});
	const deleteAlertDescription = intl.formatMessage(
		{
			id: "s3ZjbA",
			defaultMessage:
				"This action cannot be undone. This will permanently delete this {subject} and remove it from our servers.",
		},
		{ subject },
	);
	const cancelAction = intl.formatMessage({
		id: "47FYwb",
		defaultMessage: "Cancel",
	});
	const continueAction = intl.formatMessage({
		id: "acrOoz",
		defaultMessage: "Continue",
	});

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
									<TrashIcon className="text-destructive" size={LG_ICON_SIZE} />
									<span className="sr-only">{deleteAction}</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{deleteAction}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{deleteAlertTitle}</AlertDialogTitle>
					<AlertDialogDescription>
						{deleteAlertDescription}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{cancelAction}</AlertDialogCancel>
					<AlertDialogAction onClick={handler}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
