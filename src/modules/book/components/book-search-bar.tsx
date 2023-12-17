import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store";
import { listBookThunk } from "@/store/thunks/book-thunk";
import { Query } from "@/util";

export const BookSearchBar: React.FC<{ cq: CollectionQuery }> = ({ cq }) => {
	const dispatch = useAppDispatch();
	const [searchValue, setSearchValue] = React.useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		cq.filters.title = searchValue;
		if (searchValue.length >= 1) dispatch(listBookThunk({ q: new Query(cq) }));
	};

	return (
		<form className="w-full flex gap-3" onSubmit={handleSubmit}>
			<Input
				className="bg-accent rounded-full"
				type="string"
				placeholder="Search by title"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			></Input>
			<Button type="submit" variant="ghost" className="rounded-full">
				<Search />
			</Button>
		</form>
	);
};
