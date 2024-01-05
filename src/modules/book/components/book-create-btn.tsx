import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/components/language-provider";
import { CreateBtn } from "@/modules";
import { BookFormSchema } from "@/schema";
import { BookRoutes, bookApi } from "@/api";
import { BookForm } from ".";

export const BookCreateBtn: React.FC = () => {
	const translate = useTranslations();
	const bookText = translate.book();
	const createBook = translate.addNewBook();
	const createBookDesc = translate.addBookDesc();
	const createAction = translate.Create();

	const defaultValues = {
		title: "",
		author: "",
		isbn: "",
		publisher: "",
		publication_date: new Date(),
		genre: "",
		language: "",
	};

	const queryClient = useQueryClient();
	const createBookMutation = useMutation({
		mutationKey: [BookRoutes.BASE, "new"],
		mutationFn: bookApi.CreateBook,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			queryClient.setQueryData([BookRoutes.BASE, data!.data.id], data!.data);

			toast.success(translate.Success(), {
				description: translate.createBookDesc({ title: data!.data.title }),
			});
		},
	});

	const onSubmit = (values: z.infer<typeof BookFormSchema>) => {
		createBookMutation.mutate({
			...values,
			publication_date: values.publication_date.toISOString(),
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					<CreateBtn subject={bookText} />
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[75vh] p-0">
				<ScrollArea className="max-h-[70vh]">
					<div className="p-6">
						<DialogHeader>
							<DialogTitle>{createBook}</DialogTitle>
							<DialogDescription>{createBookDesc}</DialogDescription>
						</DialogHeader>
						<BookForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							action={createAction}
						/>
					</div>
					<ScrollBar />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};
