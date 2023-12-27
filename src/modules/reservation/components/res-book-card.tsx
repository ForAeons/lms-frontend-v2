import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResBadge, ResCancelBtn, ResCheckoutBtn } from ".";

export const ResBookCard: React.FC<{
	res: ReservationDetailed;
	editable?: boolean;
}> = ({ res, editable = false }) => {
	return (
		<Card className="relative border-none hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				{res.status === "pending" && (
					<>
						<ResCheckoutBtn res={res} />
						<ResCancelBtn res={res} />
					</>
				)}
			</div>

			<CardHeader>
				<CardTitle>{res.book.title}</CardTitle>
				<CardDescription>By {res.book.author}</CardDescription>
				<div className="flex flex-wrap gap-3">
					<Badge className="w-fit">Genre - {res.book.genre}</Badge>
					<ResBadge res={res} />
					{editable && (
						<Badge
							variant="secondary"
							className="w-fit"
						>{`reserved by ${res.user.username}`}</Badge>
					)}
				</div>
			</CardHeader>

			<CardContent>
				<p>{res.book.language}</p>
				<p>{res.book.publisher}</p>
				<p>{res.book.publication_date}</p>
				<p className="text-sm text-muted-foreground self-start">
					{res.book.isbn}
				</p>
			</CardContent>
		</Card>
	);
};
