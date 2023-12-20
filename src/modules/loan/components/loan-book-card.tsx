import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ListPlusIcon, Undo2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { renewLoanThunk, returnLoanThunk, useAppDispatch } from "@/store";
import { MD_ICON_SIZE } from "@/constants";
import { LoanBadge, LoanDeleteBtn } from ".";

export const LoanBookCard: React.FC<{ book: BookLoan; editable?: boolean }> = ({
	book,
	editable = false,
}) => {
	const dispatch = useAppDispatch();

	const handleReturn = () =>
		dispatch(returnLoanThunk({ loanId: book.loan.id }));
	const handleRenew = () => dispatch(renewLoanThunk({ loanId: book.loan.id }));

	return (
		<Card>
			<CardHeader className="relative pr-10">
				{editable && (
					<div className="absolute right-0 flex flex-col">
						<LoanDeleteBtn loan={book.loan} />
					</div>
				)}
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>{book.genre}</CardDescription>
				<small className="text-sm font-medium leading-none">
					{book.author}
				</small>
				<LoanBadge loan={book.loan} />
			</CardHeader>
			<CardContent>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publication_date}</p>
				<p className="text-sm text-muted-foreground self-start">{book.isbn}</p>
			</CardContent>
			{book.loan.status === "borrowed" && (
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
			)}
		</Card>
	);
};
