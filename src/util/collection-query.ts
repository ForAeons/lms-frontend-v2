import { NavigateFunction } from "react-router-dom";

export const newCollectionQuery = ({
	offset = 0,
	limit = 10,
	sortBy = "id",
	orderBy = "asc",
	filters = {},
}): CollectionQuery => {
	return {
		offset,
		limit,
		sortBy,
		orderBy,
		filters,
	};
};

/**
 * @param cq CollectionQuery object
 * @returns serialized query string
 */
export const cqToUrl = ({
	offset = 0,
	limit = 10,
	sortBy = "id",
	orderBy = "asc",
	filters = {},
}: CollectionQuery): string => {
	let query = `offset=${offset}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`;

	for (const [key, value] of Object.entries(filters)) {
		if (!Array.isArray(value)) {
			query += `&filter[${key}]=${value}`;
			continue;
		}

		if (value.length === 0) {
			continue;
		}

		query += `&filter[${key}]=${value.join(",")}`;
	}

	return query;
};

/**
 * Navigates to the previous page of a collection. Validation is not performed.
 * @param navigate Navigate function from react-router-dom
 * @param cq Collection query object
 * @param baseUrl Base URL to navigate to
 */
export const previousPage = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, offset: cq.offset - cq.limit };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}

	navigate(`?${cqToUrl(ncq)}`);
};

/**
 * Navigates to the next page of a collection. Validation is not performed.
 * @param navigate Navigate function from react-router-dom
 * @param cq Collection query object
 * @param baseUrl Base URL to navigate to
 */
export const nextPage = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, offset: cq.offset + cq.limit };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}
	navigate(`?${cqToUrl(ncq)}`);
};

export const changeLimit = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	limit: number,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, limit, offset: 0 };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}
	navigate(`?${cqToUrl(ncq)}`);
};

export const firstPage = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, offset: 0 };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}
	navigate(`?${cqToUrl(ncq)}`);
};

export const lastPage = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	total: number,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, offset: total - (total % cq.limit || cq.limit) };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}
	navigate(`?${cqToUrl(ncq)}`);
};

export const changeSort = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	sortBy: string,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, sortBy };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}
	navigate(`?${cqToUrl(ncq)}`);
};

export const changeFilter = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	filters: Filters,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, filters };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}
	navigate(`?${cqToUrl(ncq)}`);
};

export const toggleOrder = (
	navigate: NavigateFunction,
	cq: CollectionQuery,
	absoluteUrl?: string,
) => {
	const ncq = { ...cq, orderBy: cq.orderBy === "asc" ? "desc" : "asc" };
	if (absoluteUrl) {
		navigate(`${absoluteUrl}?${cqToUrl(ncq)}`);
		return;
	}
	navigate(`?${cqToUrl(ncq)}`);
};
