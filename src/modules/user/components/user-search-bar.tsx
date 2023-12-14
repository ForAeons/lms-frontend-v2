import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store";
import { searchUsersThunk } from "@/store/slices/user-slice";
import { Search } from "lucide-react";
import React from "react";

export const UserSearchBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const [searchValue, setSearchValue] = React.useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchValue.length >= 1) dispatch(searchUsersThunk(searchValue));
	};

	return (
		<form
			className="w-1/2 min-w-fit flex justify-center bg-slate-200 rounded-md"
			onSubmit={handleSubmit}
		>
			<Input
				className="focus-visible:ring-0 border-transparent bg-transparent"
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
