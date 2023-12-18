import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRightIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	const navigate = useNavigate();
	return (
		<Card className="border-none hover:shadow-md transition-shadow">
			<CardHeader className="relative">
				<Button
					variant="ghost"
					className="absolute right-0 hover:bg-transparent hover:opacity-50 transition-opacity"
					onClick={() => navigate(`${book.id}`)}
				>
					<ArrowUpRightIcon size={LG_ICON_SIZE} />
				</Button>
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.genre}</CardDescription>
				<small className="text-sm font-medium leading-none">
					{book.author}
				</small>
			</CardHeader>
			<CardContent>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publication_date}</p>
			</CardContent>
			<CardFooter className="w-full flex flex-col">
				<p className="text-sm text-muted-foreground self-start">{book.isbn}</p>
			</CardFooter>
		</Card>
	);
};
