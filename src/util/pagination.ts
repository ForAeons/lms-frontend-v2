import { NavigateFunction } from "react-router-dom";
import { cqToUrl } from ".";

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
