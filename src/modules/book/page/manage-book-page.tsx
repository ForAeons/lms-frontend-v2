import React from "react";
import { toast } from "sonner";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import {
	DeleteBtn,
	LoaderPage,
	OrderBtn,
	PaginationBar,
	SearchBar,
	SortSelect,
} from "@/modules";
import { CheckPermission, useAppSelector } from "@/store";
import { useCollectionQuery, useValidateCqOrReroute } from "@/hooks";
import {
	getNextPage,
	getPreviousPage,
	hasNextPage,
	hasPreviousPage,
} from "@/util";
import {
	BOOK_SORT_OPTIONS,
	CREATE_BOOK,
	DELETE_BOOK,
	UPDATE_BOOK,
} from "@/constants";
import { BookRoutes, bookApi } from "@/api";
import { BookCard, BookCreateBtn, BookEditBtn } from "..";

export const ManageBookPage: React.FC = () => {
	const translate = useTranslations();
	const cq = useCollectionQuery();

	const { status, data } = useQuery({
		queryKey: [BookRoutes.BASE, cq],
		queryFn: ({ signal }) => bookApi.ListBook(cq, signal),
		placeholderData: keepPreviousData,
	});

	useValidateCqOrReroute(cq, data?.meta.filtered_count);

	// prefetch previous and next page
	const queryClient = useQueryClient();
	if (hasPreviousPage(cq)) {
		const prevCq = getPreviousPage(cq);
		queryClient.prefetchQuery({
			queryKey: [BookRoutes.BASE, prevCq],
			queryFn: ({ signal }) => bookApi.ListBook(prevCq, signal),
		});
	}
	if (hasNextPage(cq)) {
		const nextCq = getNextPage(cq);
		queryClient.prefetchQuery({
			queryKey: [BookRoutes.BASE, nextCq],
			queryFn: ({ signal }) => bookApi.ListBook(nextCq, signal),
		});
	}

	const deleteBookMutation = useMutation({
		mutationFn: bookApi.DeleteBook,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [BookRoutes.BASE],
				exact: false,
			});
			toast.success(translate.Success(), {
				description: translate.deleteBookDesc({ title: data!.data.title }),
			});
		},
	});

	const canCreateBook = useAppSelector((s) => CheckPermission(s, CREATE_BOOK));
	const canUpdateBook = useAppSelector((s) => CheckPermission(s, UPDATE_BOOK));
	const canDeleteBook = useAppSelector((s) => CheckPermission(s, DELETE_BOOK));

	if (status === "pending" || !data) return <LoaderPage />;

	const books = data.data;
	const bookTitle = translate.manageBooks();
	const bookText = translate.book();

	return (
		<ScrollArea className="lg:h-[100vh] space-y-1 lg:space-y-4 lg:py-4">
			<div className="w-full grid grid-cols-1 gap-3 px-3">
				<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
					{bookTitle}
				</h2>

				<div className="flex gap-3">
					{canCreateBook && <BookCreateBtn />}
					<SearchBar cq={cq} />
				</div>

				<div className="flex gap-3">
					<OrderBtn cq={cq} />
					<SortSelect cq={cq} opt={BOOK_SORT_OPTIONS} />
				</div>

				{books.map((book) => (
					<BookCard key={book.id} book={book}>
						{canDeleteBook && (
							<DeleteBtn
								handler={() => deleteBookMutation.mutate(book.id)}
								subject={bookText}
							/>
						)}

						{canUpdateBook && <BookEditBtn book={book} />}
					</BookCard>
				))}

				<PaginationBar cq={cq} total={data.meta.filtered_count} />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
};
