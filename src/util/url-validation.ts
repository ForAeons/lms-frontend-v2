import * as Constants from "@/constants";
/**
 * Validates a collection query and returns a boolean indicating if it is valid.
 * It also updates the collection query if it is invalid.
 * @param cq
 * @param total
 */
export const isValidCq = (
	cq: CollectionQuery,
	total: number = Number.MAX_SAFE_INTEGER,
): boolean => {
	let isValid = true;

	if (cq.offset < Constants.MINIMUM_PAGE_OFFSET) {
		cq.offset = Constants.MINIMUM_PAGE_OFFSET;
		isValid = false;
	}

	if (cq.offset > total) {
		cq.offset = Math.max(0, total - cq.limit);
		isValid = false;
	}

	if (cq.limit < Constants.MINIMUM_PAGE_LIMIT) {
		cq.limit = Constants.MINIMUM_PAGE_LIMIT;
		isValid = false;
	}

	if (cq.limit > Constants.MAXIMUM_PAGE_LIMIT) {
		cq.limit = Constants.MAXIMUM_PAGE_LIMIT;
		isValid = false;
	}

	if (
		cq.orderBy !== "asc" &&
		cq.orderBy !== "desc" &&
		cq.orderBy !== undefined
	) {
		cq.orderBy = "asc";
		isValid = false;
	}

	return isValid;
};
