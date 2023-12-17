import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, searchUsersThunk } from "@/store";

export const UserSearchBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const [searchValue, setSearchValue] = React.useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchValue.length >= 1) dispatch(searchUsersThunk(searchValue));
	};

	return (
		<form className="w-full flex gap-3" onSubmit={handleSubmit}>
			<Input
				className="bg-accent rounded-full"
				type="string"
				placeholder="Search by username"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			></Input>
			<Button type="submit" variant="ghost" className="rounded-full">
				<Search />
			</Button>
		</form>
	);
};

export default UserSearchBar;
