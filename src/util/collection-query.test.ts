import { describe, expect, test } from "vitest";
import { cqToUrl } from "./collection-query";

describe("Collection Query To String", () => {
	test("CollectionQuery To String: Testing array", () => {
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

		expect(cqToUrl(cq)).toBe(
			"offset=0&limit=10&sortBy=name&orderBy=asc&filter[foo]=bar&filter[baz]=qux,quux&filter[corge]=1,2,3",
		);
	});

	test("CollectionQuery To String: Testing empty array", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: [],
			},
		};

		expect(cqToUrl(cq)).toBe("offset=0&limit=10&sortBy=name&orderBy=asc");
	});

	test("CollectionQuery To String: Testing empty object", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {},
		};

		expect(cqToUrl(cq)).toBe("offset=0&limit=10&sortBy=name&orderBy=asc");
	});

	test("CollectionQuery To String: Testing numbers", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: 1,
				bar: 2,
			},
		};

		expect(cqToUrl(cq)).toBe(
			"offset=0&limit=10&sortBy=name&orderBy=asc&filter[foo]=1&filter[bar]=2",
		);
	});

	test("CollectionQuery To String: Testing booleans", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: true,
				bar: false,
			},
		};

		expect(cqToUrl(cq)).toBe(
			"offset=0&limit=10&sortBy=name&orderBy=asc&filter[foo]=true&filter[bar]=false",
		);
	});

	test("CollectionQuery To String: Testing everything", () => {
		const cq = {
			offset: 0,
			limit: 10,
			sortBy: "name",
			orderBy: "asc",
			filters: {
				foo: "bar",
				baz: ["qux", "quux"],
				corge: [],
				grault: 1,
				garply: 2,
				waldo: true,
				fred: false,
			},
		};

		expect(cqToUrl(cq)).toBe(
			"offset=0&limit=10&sortBy=name&orderBy=asc&filter[foo]=bar&filter[baz]=qux,quux&filter[grault]=1&filter[garply]=2&filter[waldo]=true&filter[fred]=false",
		);
	});
});
