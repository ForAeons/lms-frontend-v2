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
		<form
			className="w-1/2 min-w-fit flex justify-centerd"
			onSubmit={handleSubmit}
		>
			<Input
				className="focus-visible:ring-0 bg-accent"
				type="string"
				placeholder="Search for username"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			></Input>
			<Button type="submit" variant={"ghost"}>
				<Search />
			</Button>
		</form>
	);
};

export default UserSearchBar;
