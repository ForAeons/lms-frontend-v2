import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import {
	autoCompleteBookThunk,
	autoCompleteUserThunk,
	bookSlice,
	createLoanThunk,
	useAppDispatch,
	useAppSelector,
	userSlice,
} from "@/store";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { BookUserFormSchema } from "@/schema";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/components/language-provider";

export const LoanCreateForm: React.FC = () => {
	const translate = useTranslations();
	const user = translate.User();
	const searchForUser = translate.searchForUser();
	const noUserFound = translate.noUserFound();
	const startTypingUser = translate.startTypingForUser();
	const book = translate.Book();
	const searchForBook = translate.searchForBook();
	const noBookFound = translate.noBookFound();
	const startTypingBook = translate.Create();
	const create = translate.Create();

	const dispatch = useAppDispatch();
	const userAutoComp = useAppSelector((state) => state.user.autocomplete);
	const bookAutoComp = useAppSelector((state) => state.book.autocomplete);

	const handleUserAC = (s: string) => {
		if (s.trim().length === 0) {
			dispatch(userSlice.actions.setAutoComplete([]));
			return;
		}
		const c = new AbortController();
		dispatch(autoCompleteUserThunk({ value: s, signal: c.signal }));
		return () => c.abort();
	};

	const handleBookAC = (s: string) => {
		if (s.trim().length === 0) {
			dispatch(bookSlice.actions.setAutoComplete([]));
			return;
		}
		const c = new AbortController();
		dispatch(autoCompleteBookThunk({ value: s, signal: c.signal }));
		return () => c.abort();
	};

	const form = useForm<z.infer<typeof BookUserFormSchema>>({
		resolver: zodResolver(BookUserFormSchema),
	});

	function onSubmit(values: z.infer<typeof BookUserFormSchema>) {
		dispatch(createLoanThunk({ loan: values }));
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full pt-6"
			>
				<FormField
					control={form.control}
					name="user_id"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>{user}</FormLabel>
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
											{field.value
												? userAutoComp.find((u) => u.id === field.value)
														?.username
												: searchForUser}
											<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput
											placeholder={searchForUser}
											onValueChange={handleUserAC}
										/>
										<CommandEmpty>{noUserFound}</CommandEmpty>
										{userAutoComp.length > 0 && (
											<CommandGroup>
												{userAutoComp.map((u) => (
													<CommandItem
														value={u.username}
														key={u.id}
														onSelect={() => {
															form.setValue("user_id", u.id);
														}}
													>
														<CheckIcon
															className={cn(
																"mr-2 h-4 w-4",
																u.id === field.value
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>
														{u.username}
													</CommandItem>
												))}
											</CommandGroup>
										)}
									</Command>
								</PopoverContent>
							</Popover>
							<FormDescription>{startTypingUser}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="book_copy_id"
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
											{field.value
												? bookAutoComp.find((u) => u.id === field.value)?.title
												: searchForBook}
											<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-fit p-0">
									<Command>
										<CommandInput
											placeholder={searchForBook}
											onValueChange={handleBookAC}
										/>
										<CommandEmpty>{noBookFound}</CommandEmpty>
										{bookAutoComp.length > 0 && (
											<CommandGroup>
												{bookAutoComp.map((b) => (
													<CommandItem
														value={b.title}
														key={b.id}
														onSelect={() => {
															form.setValue("book_copy_id", b.id);
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
				<DialogFooter>
					<Button type="submit">{create}</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
