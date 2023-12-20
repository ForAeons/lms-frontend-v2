import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cqToUrl } from "@/util";
import { LG_ICON_SIZE } from "@/constants";

export const SearchBar: React.FC<{ cq: CollectionQuery }> = ({ cq }) => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = React.useState("");

	const handleSubmit = () => {
		cq.filters.value = searchValue;
		navigate(`?${cqToUrl(cq)}`);
	};

	return (
		<form className="flex-grow flex gap-3" onSubmit={handleSubmit}>
			<Input
				className="bg-accent border-none shadow-sm hover:shadow-md transition-shadow"
				type="string"
				placeholder="Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			></Input>
			<Button type="submit" variant="ghost" className="p-2 m-0 rounded-full">
				<Search size={LG_ICON_SIZE} />
			</Button>
		</form>
	);
};
