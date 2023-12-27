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

export const LoanBookCard: React.FC<{
	loan: LoanDetailed;
	editable?: boolean;
}> = ({ loan, editable = false }) => {
	return (
		<Card className="relative border-none hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				{loan.status === "borrowed" && (
					<>
						<LoanReturnBtn loan={loan} />
						<LoanRenewBtn loan={loan} />
					</>
				)}
			</div>

			<CardHeader>
				<CardTitle>{loan.book.title}</CardTitle>
				<CardDescription>By {loan.book.author}</CardDescription>
				<div className="flex flex-wrap gap-3">
					<Badge className="w-fit">Genre - {loan.book.genre}</Badge>
					<LoanBadge loan={loan} />
					{editable && (
						<Badge
							variant="secondary"
							className="w-fit"
						>{`Loaned by ${loan.user.username}`}</Badge>
					)}
				</div>
			</CardHeader>

			<CardContent>
				<p>{loan.book.language}</p>
				<p>{loan.book.publisher}</p>
				<p>{loan.book.publication_date}</p>
				<p className="text-sm text-muted-foreground self-start">
					{loan.book.isbn}
				</p>
			</CardContent>
		</Card>
	);
};
