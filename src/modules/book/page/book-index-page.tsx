import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoadingPage, SearchBar } from "@/modules";
import { useTranslations } from "@/components/language-provider";
import { BookRoutes, bookApi } from "@/api";
import { BookCarousel } from "..";
import { useCollectionQuery } from "@/hooks";

export const BookIndexPage: React.FC = () => {
  const translate = useTranslations();
  const cq = useCollectionQuery();

  const { status: RecentBooksStatus, data: RecentBooks } = useQuery({
    queryKey: [BookRoutes.BASE, cq],
    queryFn: ({ signal }) => bookApi.ListBook(cq, signal),
  });

  const { status: PopularBooksStatus, data: PopularBooks } = useQuery({
    queryKey: [BookRoutes.BASE, BookRoutes.POPULAR.ROUTE],
    queryFn: ({ signal }) => bookApi.ListPopularBooks(signal),
  });

  if (
    RecentBooksStatus === "pending" ||
    PopularBooksStatus === "pending" ||
    !RecentBooks ||
    !PopularBooks
  ) {
    return <LoadingPage />;
  }

  const newArrivals = translate.newArrivals();
  const popularBooks = translate.popularBooks();

  return (
    <ScrollArea className="lg:h-[100dvh] space-y-1 lg:space-y-4 lg:py-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 px-3">
        <div className="col-span-full flex gap-3">
          <SearchBar baseUrl="/book" />
        </div>

        <h2 className="col-span-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {newArrivals}
        </h2>

        <div className="col-span-full flex justify-center">
          <BookCarousel books={RecentBooks.data} />
        </div>

        <h2 className="col-span-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {popularBooks}
        </h2>

        <div className="col-span-full flex justify-center">
          <BookCarousel books={PopularBooks.data} />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
