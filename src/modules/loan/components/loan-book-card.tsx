import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { renewLoanThunk, returnLoanThunk, useAppDispatch } from "@/store";
import { ListPlusIcon, Undo2Icon } from "lucide-react";
import { MD_ICON_SIZE } from "@/constants";
import { Badge } from "@/components/ui/badge";

export const LoanBookCard: React.FC<{ book: BookDetailed }> = ({ book }) => {
	const dispatch = useAppDispatch();

	const handleReturn = () => dispatch(returnLoanThunk(book.loans[0].id));
	const handleRenew = () => dispatch(renewLoanThunk(book.loans[0].id));

	return (
		<Card>
			<CardHeader className="relative pr-10">
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.genre}</CardDescription>
				<small className="text-sm font-medium leading-none">
					{book.author}
				</small>
				<Badge variant="destructive" className="w-fit">
					{`Due ${new Date(book.loans[0].due_date).toLocaleDateString()}`}
				</Badge>
			</CardHeader>
			<CardContent>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publication_date}</p>
				<p className="text-sm text-muted-foreground self-start">{book.isbn}</p>
			</CardContent>
			<CardFooter className="flex justify-around">
				<Button onClick={handleReturn}>
					<Undo2Icon size={MD_ICON_SIZE} className="mr-3" />
					Return
				</Button>
				<Button variant="secondary" onClick={handleRenew}>
					<ListPlusIcon size={MD_ICON_SIZE} className="mr-3" />
					Renew
				</Button>
			</CardFooter>
		</Card>
	);
};
