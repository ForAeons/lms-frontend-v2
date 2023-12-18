import { describe, it, expect } from "vitest";
import * as Constants from "@/constants";
import { isValidCq } from "./url-validation";

describe("URL Validation", () => {
	it("Testing valid collection query", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(true);
	});

	it("Testing invalid offset", () => {
		const cq = {
			offset: -1,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(false);
		expect(cq.offset).toBe(Constants.MINIMUM_PAGE_OFFSET);
	});

	it("Testing invalid offset (too high)", () => {
		const cq = {
			offset: 1000,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(false);
		expect(cq.offset).toBe(90);
	});

	it("Testing invalid limit", () => {
		const cq = {
			offset: 0,
			limit: -1,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(false);
		expect(cq.limit).toBe(Constants.MINIMUM_PAGE_LIMIT);
	});

	it("Testing invalid limit (too high)", () => {
		const cq = {
			offset: 0,
			limit: 1000,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(false);
		expect(cq.limit).toBe(Constants.MAXIMUM_PAGE_LIMIT);
	});

	it("Testing invalid limit (too low)", () => {
		const cq = {
			offset: 0,
			limit: 1,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(false);
		expect(cq.limit).toBe(Constants.MINIMUM_PAGE_LIMIT);
	});

	it("Testing valid orderBy", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "desc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(true);
		expect(cq.orderBy).toBe("desc");
	});

	it("Testing invalid orderBy", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "foo",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [1, 2, 3],
			},
		};

		expect(isValidCq(cq, 100)).toBe(false);
		expect(cq.orderBy).toBe("asc");
	});
});
