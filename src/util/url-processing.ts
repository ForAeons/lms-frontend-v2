import * as Constants from "@/constants";

export const getOffset = (p: URLSearchParams): number => {
	const offset = p.get("offset");
	if (!offset) return Constants.MINIMUM_PAGE_OFFSET;
	const offsetNumber = parseInt(offset);
	if (isNaN(offsetNumber)) return Constants.MINIMUM_PAGE_OFFSET;
	return offsetNumber;
};

export const getLimit = (p: URLSearchParams): number => {
	const limit = p.get("limit");
	if (!limit) return Constants.MINIMUM_PAGE_LIMIT;
	const limitNumber = parseInt(limit);
	if (isNaN(limitNumber)) return Constants.MINIMUM_PAGE_LIMIT;
	return limitNumber;
};

export const getSortBy = (p: URLSearchParams): string => {
	const sortBy = p.get("sortBy");
	if (!sortBy) return "created_at";
	return sortBy;
};

export const getOrderBy = (p: URLSearchParams): string => {
	const orderBy = p.get("orderBy");
	if (!orderBy) return "asc";
	return orderBy;
};

const parseValue = (value: string): string | number | boolean => {
	if (value === "true") return true;
	if (value === "false") return false;
	if (value.match(/^-{0,1}\d+$/)) return parseInt(value);
	return value;
};

export const getFilters = (p: URLSearchParams): Filters => {
	const filters: Filters = {};

	p.forEach((value, key) => {
		// Check if the key represents a filter
		if (key.startsWith("filter[")) {
			const filterKey = key.match(/filter\[(.*?)\]/)?.[1];
			if (filterKey) {
				// Handle different data types
				if (value.includes(",")) {
					filters[filterKey] = value
						.split(",")
						.map((val) => parseValue(val)) as unknown as keyof Filters;
				} else {
					filters[filterKey] = parseValue(value);
				}
			}
		}
	});

	return filters;
};

export const getCollectionQuery = (p: URLSearchParams): CollectionQuery => {
	return {
		offset: getOffset(p),
		limit: getLimit(p),
		sortBy: getSortBy(p),
		orderBy: getOrderBy(p),
		filters: getFilters(p),
	};
};

export const hasPreviousPage = (cq: CollectionQuery): boolean => {
	return cq.offset >= cq.limit;
};

export const getPreviousPage = (cq: CollectionQuery): CollectionQuery => {
	return {
		...cq,
		offset: cq.offset - cq.limit,
	};
};

export const hasNextPage = (
	cq: CollectionQuery,
	total: number = Number.MAX_SAFE_INTEGER,
): boolean => {
	return cq.offset + cq.limit <= total;
};

export const getNextPage = (cq: CollectionQuery): CollectionQuery => {
	return {
		...cq,
		offset: cq.offset + cq.limit,
	};
};
