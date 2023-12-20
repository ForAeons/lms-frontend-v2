import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoanBadge, LoanRenewBtn, LoanReturnBtn } from ".";
import { deleteLoanThunk, useAppDispatch } from "@/store";
import { DeleteBtn } from "@/modules";

export const LoanBookCard: React.FC<{ book: BookLoan; editable?: boolean }> = ({
	book,
	editable = false,
}) => {
	const dispatch = useAppDispatch();
	const handleDelete = () =>
		dispatch(deleteLoanThunk({ loanId: book.loan.id }));

	return (
		<Card className="relative border-none hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				{editable && <DeleteBtn handler={handleDelete} subject="loan" />}
				{book.loan.status === "borrowed" && (
					<>
						<LoanReturnBtn loan={book.loan} />
						<LoanRenewBtn loan={book.loan} />
					</>
				)}
			</div>

			<CardHeader>
				<CardTitle>{book.title}</CardTitle>
				<CardDescription>By {book.author}</CardDescription>
				<div className="flex flex-wrap gap-3">
					<Badge className="w-fit">Genre - {book.genre}</Badge>
					<LoanBadge loan={book.loan} />
					{editable && (
						<Badge
							variant="secondary"
							className="w-fit"
						>{`Loaned by ${book.user.person_attributes.full_name}`}</Badge>
					)}
				</div>
			</CardHeader>

			<CardContent>
				<p>{book.language}</p>
				<p>{book.publisher}</p>
				<p>{book.publication_date}</p>
				<p className="text-sm text-muted-foreground self-start">{book.isbn}</p>
			</CardContent>
		</Card>
	);
};
