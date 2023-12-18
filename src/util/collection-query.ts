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
