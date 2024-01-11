import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "@/components/language-provider";
import { BookFormValues } from "@/schema";
import { BookRoutes, bookApi } from "@/api";
import { BookForm, BookQuerySearchBar } from ".";

export const BookCreateNewForm: React.FC<{
	setOpen: UnaryHandler<boolean>;
}> = ({ setOpen }) => {
	const translate = useTranslations();
	const createBook = translate.addNewBook();
	const createBookDesc = translate.addBookDesc();
	const createAction = translate.Create();

	const [defaultValues, setDefaultValues] = React.useState<BookFormValues>({
		title: "",
		author: "",
		isbn: "",
		publisher: "",
		publication_date: new Date(),
		genre: "",
		language: "",
	});

	const queryClient = useQueryClient();
	const createBookMutation = useMutation({
		mutationKey: [BookRoutes.BASE, "new"],
		mutationFn: bookApi.CreateBook,
		onSuccess: (data) => {
			setOpen(false);
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			queryClient.setQueryData([BookRoutes.BASE, data!.data.id], data!.data);

			toast.success(translate.Success(), {
				description: translate.createBookDesc({ title: data!.data.title }),
			});
		},
	});

	const onSubmit = (values: BookFormValues) => {
		createBookMutation.mutate({
			...values,
			publication_date: values.publication_date.toISOString(),
		});
	};

	return (
		<div className="p-6">
			<DialogHeader>
				<DialogTitle>{createBook}</DialogTitle>
				<DialogDescription>{createBookDesc}</DialogDescription>
			</DialogHeader>
			<BookQuerySearchBar setDefaultValues={setDefaultValues} />
			<BookForm
				defaultValues={defaultValues}
				onSubmit={onSubmit}
				action={createAction}
			/>
		</div>
	);
};
