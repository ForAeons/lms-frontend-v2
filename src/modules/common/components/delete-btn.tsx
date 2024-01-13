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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE, TOOLTIP_DELAY } from "@/constants";
import { useTranslations } from "@/components/language-provider";

export const DeleteBtn: React.FC<{
	handler?: NullaryHandler;
	subject: string;
	disabled?: boolean;
}> = ({ handler, subject, disabled }) => {
	const translate = useTranslations();
	const deleteAction = translate.Delete();
	const deleteAlertTitle = translate.areYouSure();
	const deleteAlertDescription = translate.thisActionCannotBeUndone({
		subject,
	});
	const cancelAction = translate.Cancel();
	const continueAction = translate.Continue();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div>
					<TooltipProvider delayDuration={TOOLTIP_DELAY}>
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
					<AlertDialogAction onClick={handler} disabled={disabled}>
						{continueAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
