/**
 * Book interface is the basic book object
 * @property id - the book's id
 * @property title - the book's title
 * @property author - the book's author
 * @property isbn - the book's isbn
 * @property publisher - the book's publisher
 * @property publication_date - the book's publication date
 * @property genre - the book's genre
 * @property language - the book's language
 */
interface Book {
	id: number;
	title: string;
	author: string;
	isbn: string;
	publisher: string;
	publication_date: string;
	genre: string;
	language: string;
}

/**
 * BookCreate is the object used to create a new book
 */
type BookCreate = Omit<Book, "id">;

/**
 * BookUpdate is the object used to update a book
 */
type BookUpdate = Partial<BookCreate>;

interface BookDetailed extends Book {
	book_copies: BookCopy[];
}

interface BookUser {
	user_id: number;
	book_copy_id: number;
}

interface BookSimple {
	id: number;
	title: string;
}

type WithBook<T> = T & {
	book: Book;
};

interface Bookmark {
	id: number;
	user_id: number;
	book_id: number;
}

interface BookmarkDetailed extends Bookmark {
	book: BookDetailed;
}
