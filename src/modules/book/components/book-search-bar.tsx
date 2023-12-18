import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { cqToUrl } from "@/util";

export const BookSearchBar: React.FC<{ cq: CollectionQuery }> = ({ cq }) => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = React.useState("");

	const handleSubmit = () => {
		cq.filters.title = searchValue;
		navigate(`?${cqToUrl(cq)}`);
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
