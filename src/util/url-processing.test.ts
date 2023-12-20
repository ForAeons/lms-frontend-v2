import { describe, it, expect } from "vitest";
import * as Constants from "@/constants";
import { getOffset, getLimit, getSortBy, getOrderBy, getFilters } from ".";

describe("URLSearchParams Utility Functions", () => {
	describe("getOffset", () => {
		it("should return the offset from URL string", () => {
			const params = new URLSearchParams("offset=5");
			expect(getOffset(params)).toBe(5);
		});

		it("should return minimum offset for invalid value", () => {
			const params = new URLSearchParams("offset=invalid");
			expect(getOffset(params)).toBe(Constants.MINIMUM_PAGE_OFFSET);
		});

		it("should return minimum offset for missing value", () => {
			const params = new URLSearchParams("");
			expect(getOffset(params)).toBe(Constants.MINIMUM_PAGE_OFFSET);
		});
	});

	describe("getLimit", () => {
		it("should return the limit from URL string", () => {
			const params = new URLSearchParams("limit=20");
			expect(getLimit(params)).toBe(20);
		});

		it("should return minimum limit for invalid value", () => {
			const params = new URLSearchParams("limit=invalid");
			expect(getLimit(params)).toBe(Constants.MINIMUM_PAGE_LIMIT);
		});

		it("should return minimum limit for missing value", () => {
			const params = new URLSearchParams("");
			expect(getLimit(params)).toBe(Constants.MINIMUM_PAGE_LIMIT);
		});
	});

	describe("getSortBy", () => {
		it("should return the sortBy value from URL string", () => {
			const params = new URLSearchParams("sortBy=name");
			expect(getSortBy(params)).toBe("name");
		});

		it("should return default sortBy for missing value", () => {
			const params = new URLSearchParams("");
			expect(getSortBy(params)).toBe("created_at");
		});
	});

	describe("getOrderBy", () => {
		it("should return the orderBy value from URL string", () => {
			const params = new URLSearchParams("orderBy=desc");
			expect(getOrderBy(params)).toBe("desc");
		});

		it("should return default orderBy for missing value", () => {
			const params = new URLSearchParams("");
			expect(getOrderBy(params)).toBe("asc");
		});
	});

	describe("getFilters", () => {
		it("should parse filters correctly from URL string", () => {
			const params = new URLSearchParams(
				"filter[foo]=bar&filter[num]=1&filter[bool]=true",
			);
			const expected = {
				foo: "bar",
				num: 1,
				bool: true,
			};
			expect(getFilters(params)).toEqual(expected);
		});

		it("should handle filters with array values", () => {
			const params = new URLSearchParams("filter[array]=value1,value2,value3");
			const expected = {
				array: ["value1", "value2", "value3"],
			};
			expect(getFilters(params)).toEqual(expected);
		});

		it("should return an empty object for missing filters", () => {
			const params = new URLSearchParams("");
			expect(getFilters(params)).toEqual({});
		});
	});
});
