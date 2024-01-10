import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
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
import { useTranslations } from "@/components/language-provider";
import { BookRoutes, UserRoutes, bookApi, userApi } from "@/api";
import { BookUserFormSchema } from "@/schema";
import { cn } from "@/lib/utils";

export const ResCreateForm: React.FC<{
	onSubmit: UnaryHandler<z.infer<typeof BookUserFormSchema>>;
}> = ({ onSubmit }) => {
	const translate = useTranslations();
	const user = translate.User();
	const searchForUser = translate.searchForUser();
	const noUserFound = translate.noUserFound();
	const startTypingUser = translate.startTypingForUser();
	const book = translate.Book();
	const searchForBook = translate.searchForBook();
	const createAction = translate.Create();
	const noBookFound = translate.noBookFound();
	const startTypingBook = translate.startTypingForBook();

	const [userAc, setUserAc] = React.useState("");
	const [bookAc, setBookAc] = React.useState("");

	const { data: userACData } = useQuery({
		enabled: userAc.length > 1,
		queryKey: [UserRoutes.BASE, UserRoutes.AUTOCOMPLETE.BASE, userAc],
		queryFn: ({ signal }) => userApi.AutoComplete(userAc, signal),
	});

	const { data: bookACData } = useQuery({
		enabled: bookAc.length > 1,
		queryKey: [BookRoutes.BASE, BookRoutes.AUTOCOMPLETE.ROUTE, bookAc],
		queryFn: ({ signal }) => bookApi.AutoComplete(bookAc, signal),
	});

	const form = useForm<z.infer<typeof BookUserFormSchema>>({
		resolver: zodResolver(BookUserFormSchema),
	});

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
											{field.value && !!userACData
												? userACData.data.find((u) => u.id === field.value)
														?.username
												: searchForUser}
											<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command shouldFilter={false}>
										<CommandInput
											placeholder={searchForUser}
											onValueChange={setUserAc}
										/>
										<CommandEmpty>{noUserFound}</CommandEmpty>
										{!!userACData && (
											<CommandGroup>
												{userACData.data.map((u) => (
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
											{field.value && !!bookACData
												? bookACData.data.find((u) => u.id === field.value)
														?.title
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
										{!!bookACData && (
											<CommandGroup>
												{bookACData.data.map((b) => (
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
				<DialogFooter>
					<Button type="submit">{createAction}</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
