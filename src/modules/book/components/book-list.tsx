import React from "react";
import { BookCard } from ".";

export const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
			{books.map((book) => {
				return <BookCard key={book.isbn} book={book} />;
			})}
		</div>
	);
};

export default BookList;
