import React from "react";
import { BookCard } from ".";

// interface Book {
// 	id: number;
// 	title: string;
// 	author: string;
// 	isbn: string;
// 	publisher: string;
// 	publicationDate: string;
// 	genre: string;
// 	language: string;
// }

const books: Book[] = [
	{
		id: 0,
		title: "Isabel Robbins",
		author: "Helena Sutton",
		isbn: "z5y9HR284lCFOsitDQ8",
		publisher: "eWQVcndQnxjYtHQP",
		publicationDate: "12/11/2047",
		genre: "dBxAElTUpUtrPtkKTrV",
		language: "3lXrn",
	},
	{
		id: 0,
		title: "Isabella Manning",
		author: "Rebecca Cox",
		isbn: "gtr0JsF",
		publisher: "vHErecZuZrIsHq",
		publicationDate: "1/7/2106",
		genre: "ZAzJObMNzdQDE",
		language: "l8j2xij2Pk34rh",
	},
	{
		id: 0,
		title: "Robert Carlson",
		author: "Jerry Turner",
		isbn: "C6Wyj4TDBhhbvZ",
		publisher: "QKMhhIb",
		publicationDate: "9/2/2051",
		genre: "ZNYAs",
		language: "9ZznjX9MY",
	},
	{
		id: 0,
		title: "Leonard Sullivan",
		author: "Lenora Potter",
		isbn: "ECpfwjXZYo8uyoIG8h",
		publisher: "waHDYnJVPFO",
		publicationDate: "4/19/2075",
		genre: "lYjwEDRqUiElr",
		language: "ZFCWuLIoLjTrGqMVLbM",
	},
	{
		id: 0,
		title: "Polly Joseph",
		author: "Nannie Guerrero",
		isbn: "vanwH9jww6rFm",
		publisher: "ryIDUP",
		publicationDate: "4/17/2113",
		genre: "PEwJVq",
		language: "KWeHzoauVex98nz4x",
	},
	{
		id: 0,
		title: "Zachary Taylor",
		author: "Sarah Shelton",
		isbn: "dVkfFde",
		publisher: "rxpYzODmZa",
		publicationDate: "8/23/2091",
		genre: "gVpgAV",
		language: "IT93gN6HLXdZb",
	},
	{
		id: 0,
		title: "Charlotte Walters",
		author: "Juan Hunter",
		isbn: "ctMctSiAfHV",
		publisher: "yHLvgeIxIUCOaz",
		publicationDate: "1/3/2066",
		genre: "ByNNtWTpzBfamN",
		language: "4MYxvV",
	},
	{
		id: 0,
		title: "Rosetta Hubbard",
		author: "Caleb Graham",
		isbn: "YFYNxn22hJxnZaynWRc",
		publisher: "PEXlAW",
		publicationDate: "4/23/2085",
		genre: "LNDMBRewUtNM",
		language: "wNfqR528uRxrnKxArK0E",
	},
	{
		id: 0,
		title: "Ronnie Neal",
		author: "Raymond Cooper",
		isbn: "UzZXozLkXYZzOQLPTGva",
		publisher: "RgdWJGTQwnvTwUFApt",
		publicationDate: "7/11/2089",
		genre: "kltyuT",
		language: "RAxSGfg",
	},
	{
		id: 0,
		title: "Winifred Barker",
		author: "Katherine Lindsey",
		isbn: "P3DFxFOpn9yW7L1wXdl",
		publisher: "dhXkoHs",
		publicationDate: "3/15/2023",
		genre: "ElOAsYc",
		language: "Fd2NiAF",
	},
	{
		id: 0,
		title: "Brian Castro",
		author: "Harriet Rodgers",
		isbn: "h0HwV1q7mbHqfSQzFwb",
		publisher: "kVWhnIQInolofoirMRTP",
		publicationDate: "1/30/2114",
		genre: "lSlXQGDDgAGHPQIPjNaH",
		language: "GJcubT",
	},
	{
		id: 0,
		title: "Clara Sutton",
		author: "Daisy Stone",
		isbn: "iYLsjLo5jxCeFcpqkF",
		publisher: "RFtrtEJgftzHJLiAX",
		publicationDate: "5/6/2034",
		genre: "ToeJEUqAYgVb",
		language: "sy1xuEz9IX",
	},
	{
		id: 0,
		title: "Bernard Gross",
		author: "Estella Webster",
		isbn: "z0qs9vwrIEXjnA",
		publisher: "gPgvE",
		publicationDate: "10/30/2064",
		genre: "OluhwXuNLEolrk",
		language: "Xrdx66s9LW6Bpu356rYh",
	},
	{
		id: 0,
		title: "Frederick Hodges",
		author: "Vincent Flores",
		isbn: "96cKx4",
		publisher: "HZegl",
		publicationDate: "2/26/2027",
		genre: "uPhkxxXNdHTiOMnD",
		language: "hzn2DpnxDqaO",
	},
	{
		id: 0,
		title: "Maude Powers",
		author: "Bertie Brady",
		isbn: "rIV2fZ",
		publisher: "QDsJlXTIfgyat",
		publicationDate: "6/2/2075",
		genre: "qEeqvj",
		language: "jxQyxB",
	},
	{
		id: 0,
		title: "Hettie Jenkins",
		author: "Nathaniel Bell",
		isbn: "SixmzKHighuO0Cu",
		publisher: "gdGEFFhYGcWTalPqA",
		publicationDate: "9/25/2023",
		genre: "ZXJDcyncCVjBa",
		language: "cGqz87QEs4oyFM",
	},
	{
		id: 0,
		title: "Jackson Ramos",
		author: "Melvin Lynch",
		isbn: "EPIcp",
		publisher: "ZiUaO",
		publicationDate: "2/10/2107",
		genre: "IwVIv",
		language: "MF5M0pXzARGMlhqIXy",
	},
];

export const BookTable: React.FC = () => {
	return (
		<div className="flex flex-wrap gap-3">
			{books.map((book) => {
				return <BookCard book={book} />;
			})}
		</div>
	);
};

export default BookTable;
