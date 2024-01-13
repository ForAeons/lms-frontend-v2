import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useTranslations } from "@/components/language-provider";
import { BookRoutes, BookcopyRoutes, bookApi, bookcopyApi } from "@/api";
import { BookCopyFormValues, GetBookCopyFormSchema } from "@/schema";
import { cn } from "@/lib/utils";

export const BookCreateExistingForm: React.FC<{
	setOpen: UnaryHandler<boolean>;
}> = ({ setOpen }) => {
	const translate = useTranslations();
	const book = translate.Book();
	const searchForBook = translate.searchForBook();
	const noBookFound = translate.noBookFound();
	const startTypingBook = translate.startTypingForBook();
	const create = translate.Create();
	const amount = translate.Amount();

	const [bookAc, setBookAc] = React.useState("");

	const { data } = useQuery({
		enabled: bookAc.length > 1,
		queryKey: [BookRoutes.BASE, BookRoutes.AUTOCOMPLETE.ROUTE, bookAc],
		queryFn: ({ signal }) => bookApi.AutoComplete(bookAc, signal),
	});

	const form = useForm<BookCopyFormValues>({
		resolver: zodResolver(GetBookCopyFormSchema()),
	});

	const queryClient = useQueryClient();
	const createBookcopiesMutation = useMutation({
		mutationKey: [
			BookRoutes.BASE,
			form.getValues().book_id,
			BookcopyRoutes.BASE,
		],
		mutationFn: bookcopyApi.CreateBookcopy,
		onSuccess: () => {
			setOpen(false);
			queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
			toast.success(translate.Success());
		},
	});

	const onSubmit = (values: BookCopyFormValues) => {
		createBookcopiesMutation.mutate({ ...values, bookID: values.book_id });
	};

	return (
		<div className="p-6">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full pt-6"
				>
					<FormField
						control={form.control}
						name="book_id"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>{book}</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"w-full justify-between",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value && !!data
													? data.data.find((u) => u.id === field.value)?.title
													: searchForBook}
												<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-fit p-0">
										<Command>
											<CommandInput
												placeholder={searchForBook}
												onValueChange={setBookAc}
											/>
											<CommandEmpty>{noBookFound}</CommandEmpty>
											{!!data && (
												<CommandGroup>
													{data.data.map((b) => (
														<CommandItem
															value={b.title}
															key={b.id}
															onSelect={() => {
																form.setValue("book_id", b.id);
															}}
														>
															<CheckIcon
																className={cn(
																	"mr-2 h-4 w-4",
																	b.id === field.value
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
															{b.title}
														</CommandItem>
													))}
												</CommandGroup>
											)}
										</Command>
									</PopoverContent>
								</Popover>
								<FormDescription>{startTypingBook}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="count"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>{amount}</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="number"
										className="w-full"
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter>
						<Button type="submit" disabled={createBookcopiesMutation.isPending}>
							{create}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</div>
	);
};
