import React from "react";
import { CheckIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { ExternalRoutes, externalApi } from "@/api";
import { BookFormValues } from "@/schema";
import { BookSearchSelect } from ".";

export const BookQuerySearchBar: React.FC<{
	setDefaultValues: UnaryHandler<BookFormValues>;
}> = ({ setDefaultValues }) => {
	const translate = useTranslations();
	const noBookFound = translate.noBookFound();
	const searchForBook = translate.searchForBook();
	const search = translate.Search();
	const titleByAuthor = translate.titleByAuthor;

	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const [queryKey, setQueryKey] =
		React.useState<keyof ExternalBookQuery>("title");
	const [queryValue, setQueryValue] = React.useState("");

	let enabled = queryValue.length > 1;
	if (queryKey === "isbn") {
		enabled = queryValue.length === 10 || queryValue.length === 13;
	}
	const query = { [queryKey]: queryValue };
	const { data } = useQuery({
		enabled: enabled,
		queryKey: [ExternalRoutes.BASE, query],
		queryFn: ({ signal }) => externalApi.QueryBook(query, signal),
	});

	return (
		<div className="flex gap-3 mt-3">
			<BookSearchSelect setKey={setQueryKey} setValue={setQueryValue} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="flex-grow justify-between"
					>
						{value || searchForBook}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					style={{ maxWidth: "calc(min(100vw, 576px))" }}
					className="w-full p-0"
				>
					<Command shouldFilter={false}>
						<CommandInput placeholder={search} onValueChange={setQueryValue} />
						<CommandEmpty>{noBookFound}</CommandEmpty>
						<CommandList>
							{!!data &&
								data.data.map((b) => (
									<CommandItem
										key={b.title + b.author + b.isbn}
										value={b.title}
										onSelect={(v) => {
											setValue(v);
											setDefaultValues({
												title: b.title,
												author: b.author,
												publisher: b.publisher,
												publication_date: new Date(b.publication_date),
												genre: b.genre,
												language: b.language,
												isbn: b.isbn,
											});
											setOpen(false);
										}}
									>
										{titleByAuthor({ title: b.title, author: b.author })}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												value === b.title ? "opacity-100" : "opacity-0",
											)}
										/>
									</CommandItem>
								))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};
