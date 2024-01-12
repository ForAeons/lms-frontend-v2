import React from "react";
import { toast } from "sonner";
import { PenSquareIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/components/language-provider";
import { LG_ICON_SIZE, UPDATE_BOOK } from "@/constants";
import { CheckPermission, useAppSelector } from "@/store";
import { BookRoutes, bookApi } from "@/api";
import { BookPicture } from ".";

export const BookEditablePicture: React.FC<{
	book: Book;
}> = ({ book }) => {
	const translate = useTranslations();
	const save = translate.Save();
	const previewThumbnail = translate.previewThumbnail();
	const canUpdateBook = useAppSelector((s) => CheckPermission(s, UPDATE_BOOK));

	const [file, setFile] = React.useState<File | undefined>();
	const [previewUrl, setPreviewUrl] = React.useState<string | undefined>();
	const [open, setOpen] = React.useState(false);

	// Revoke the data uris to avoid memory leaks
	React.useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.files?.length) return;
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		setPreviewUrl(URL.createObjectURL(selectedFile));
	};

	const queryClient = useQueryClient();
	const updateBookMutation = useMutation({
		mutationKey: [BookRoutes.BASE],
		mutationFn: bookApi.UpdateBookCover,
		onSuccess: () => {
			setOpen(false);
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			toast.success(translate.Success());
		},
	});

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (!file) return;
		updateBookMutation.mutate({ bookID: book.id, thumbnail: file });
	};

	return (
		<>
			<BookPicture book={book} />

			{canUpdateBook && (
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger className="absolute w-full h-full top-0 left-0 rounded-md bg-neutral-800 opacity-0 hover:opacity-90 transition-opacity">
						<PenSquareIcon
							size={LG_ICON_SIZE}
							className="text-primary-foreground m-auto"
						/>
					</PopoverTrigger>
					<PopoverContent className="w-fit">
						<form onSubmit={onSubmit} className="grid gap-3">
							<Label className="text-lg font-semibold">
								{previewThumbnail}
							</Label>

							<div className="lg:w-[200px] w-[150px] mx-auto">
								<BookPicture book={{ ...book, thumbnail_url: previewUrl }} />
							</div>

							<Input type="file" accept="image/*" onChange={handleFileChange} />

							<Button
								type="submit"
								disabled={!file || updateBookMutation.isPending}
								className="w-full"
							>
								{save}
							</Button>
						</form>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
};
