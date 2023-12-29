import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cqToUrl } from "@/util";
import { LG_ICON_SIZE } from "@/constants";

export const SearchBar: React.FC<{ cq: CollectionQuery; baseUrl?: string }> = ({
	cq,
	baseUrl,
}) => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = React.useState(
		cq.filters.value as string,
	);

	const handleSubmit = () => {
		cq.filters.value = searchValue;
		navigate(`${baseUrl}?${cqToUrl(cq)}`);
	};

	return (
		<form className="flex-grow flex gap-3 mt-1" onSubmit={handleSubmit}>
			<Input
				className="bg-accent border-none shadow-sm hover:shadow-md transition-shadow"
				type="string"
				placeholder="Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			></Input>
			<Button
				type="submit"
				variant="ghost"
				className="hover:bg-transparent hover:opacity-50 transition-opacity"
			>
				<Search size={LG_ICON_SIZE} />
			</Button>
		</form>
	);
};
