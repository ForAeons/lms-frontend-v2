import { Button } from "@/components/ui/button";
import { QRScanner } from "@/modules";
import { Html5QrcodeCameraScanConfig } from "html5-qrcode";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { QrCodeIcon } from "lucide-react";
import { BookCopyDetailedValues, GetBookCopyDetailedSchema } from "@/schema";
import { useTranslations } from "@/components/language-provider";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	BookRoutes,
	BookcopyRoutes,
	LoanRoutes,
	bookApi,
	bookcopyApi,
} from "@/api";
import { BookPicture } from "@/modules/book";

const config: Html5QrcodeCameraScanConfig = {
	fps: 5,
	qrbox: 250,
	aspectRatio: 1,
};

export const ReturnScannerPage: React.FC = () => {
	const translate = useTranslations();
	const [start, setStart] = React.useState(false); // State for scanner
	const [open, setOpen] = React.useState(false); // State for dialog
	const [dontAskMeAgain, setDontAskMeAgain] = React.useState(false); // State for dialog
	const [bookcopy, setBookcopy] = React.useState<
		BookCopyDetailedValues | undefined
	>();

	const queryClient = useQueryClient();
	const returnBookMutation = useMutation({
		mutationKey: [
			BookcopyRoutes.BASE,
			bookcopy?.id,
			LoanRoutes.BASE,
			LoanRoutes.RETURN.ROUTE,
		],
		mutationFn: bookcopyApi.ReturnBookcopy,
		onSuccess: (data) => {
			const loan = data!.data;
			queryClient.invalidateQueries({ queryKey: [LoanRoutes.BASE] });
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.returnLoanSuccessDesc({
					title: loan.book.title,
				}),
			});

			setBookcopy(undefined);
		},
	});

	const onSuccessfulScan = (decodedText: string) => {
		if (bookcopy) return;

		const parsed = JSON.parse(decodedText);
		const BookCopySchema = GetBookCopyDetailedSchema(translate);
		const copy = BookCopySchema.safeParse(parsed);

		if (copy.success) {
			if (dontAskMeAgain) {
				returnBookMutation.mutate({ bookcopyID: copy.data.id });
				return;
			}

			setBookcopy(copy.data);
			setStart(false);
			setOpen(true);
		} else {
			toast.error(translate.Error(), {
				description: translate.invalidQRCode(),
			});
		}
	};

	const bookQuery = useQuery({
		enabled: !!bookcopy,
		queryKey: [BookRoutes.BASE, bookcopy?.book.id],
		queryFn: ({ signal }) => bookApi.GetBook(bookcopy!.book.id, signal),
	});

	const handleCancel = () => {
		setBookcopy(undefined);
		setOpen(false);
		setStart(false);
	};
	const handleLoanBook = () => {
		if (!bookcopy) return;
		returnBookMutation.mutate({ bookcopyID: bookcopy.id });
	};

	const returnBooks = translate.returnBooks();
	const ConfirmationDescription = translate.returnBookDesc();
	const Continue = translate.Continue();
	const Cancel = translate.Cancel();
	const dontAskMeAgainText = translate.dontAskMeAgain();
	const activateQRScanner = translate.activateQRScanner();
	const QRScannerViewfinder = translate.qrScannerViewfinder();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{returnBooks}
				</h2>

				<div className="mx-auto lg:mt-[10vh] mt-10 flex flex-col gap-10 justify-center items-center">
					<Button
						size="lg"
						variant="default"
						className="w-fit"
						onClick={() => setStart((s) => !s)}
					>
						<QrCodeIcon className="h-6 w-6 mr-2" />
						{activateQRScanner}
					</Button>

					<div className="mx-auto border-4 border-dashed border-gray-300 dark:border-gray-700 w-96 h-96 rounded-lg">
						{!start && (
							<p className="text-center text-sm text-muted-foreground mt-48">
								{QRScannerViewfinder}
							</p>
						)}

						{start && (
							<QRScanner
								onSuccessfulScan={onSuccessfulScan}
								cameraConfig={config}
							/>
						)}
					</div>

					<div className="flex gap-3 items-center">
						<Checkbox
							checked={dontAskMeAgain}
							onCheckedChange={(c) => setDontAskMeAgain(!!c)}
						/>
						<label
							className="text-gray-600 dark:text-gray-400"
							htmlFor="disableConfirmation"
						>
							{dontAskMeAgainText}
						</label>
					</div>
				</div>

				<AlertDialog open={open} onOpenChange={setOpen}>
					<AlertDialogTrigger className="hidden" />
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>{returnBooks}</AlertDialogTitle>
							<AlertDialogDescription>
								{ConfirmationDescription}
							</AlertDialogDescription>
							{!!bookcopy && (
								<div className="mx-auto lg:w-[200px] w-[150px] rounded-md shadow-lg">
									<BookPicture
										book={{
											...bookcopy.book,
											thumbnail_url: bookQuery.data?.data.thumbnail_url,
										}}
									/>
								</div>
							)}
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={handleCancel}>
								{Cancel}
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleLoanBook}
								disabled={returnBookMutation.isPending}
							>
								{Continue}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<ScrollBar />
		</ScrollArea>
	);
};
