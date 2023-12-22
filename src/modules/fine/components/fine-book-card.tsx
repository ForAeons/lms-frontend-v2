import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FineBadge, FineSettleBtn } from ".";
import { deleteFineThunk, useAppDispatch } from "@/store";
import { DeleteBtn } from "@/modules";

export const FineBookCard: React.FC<{
	fine: FineDetailed;
	editable?: boolean;
}> = ({ fine, editable = false }) => {
	const dispatch = useAppDispatch();
	const handleDelete = () => dispatch(deleteFineThunk({ fineId: fine.id }));

	return (
		<Card className="relative border-none hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				{editable && <DeleteBtn handler={handleDelete} subject="fine" />}
				{fine.status === "outstanding" && <FineSettleBtn fine={fine} />}
			</div>

			<CardHeader>
				<CardTitle>{fine.book.title}</CardTitle>
				<CardDescription>By {fine.book.author}</CardDescription>
				<div className="flex flex-wrap gap-3">
					<Badge className="w-fit">Genre - {fine.book.genre}</Badge>
					<FineBadge fine={fine} />
					{editable && (
						<Badge
							variant="secondary"
							className="w-fit"
						>{`Fined to ${fine.user.username}`}</Badge>
					)}
				</div>
			</CardHeader>

			<CardContent>
				<p>{fine.book.language}</p>
				<p>{fine.book.publisher}</p>
				<p>{fine.book.publication_date}</p>
				<p className="text-sm text-muted-foreground self-start">
					{fine.book.isbn}
				</p>
			</CardContent>
		</Card>
	);
};
