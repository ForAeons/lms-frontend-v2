import { describe, it, expect } from "vitest";
import { HasPermission } from "./permission";

describe("Permission utility functions", () => {
	it("Have Permission", () => {
		const abilities = ["canManageAll"];

		const keyword1 = "createbook";
		expect(HasPermission(abilities, keyword1)).toBe(true);

		const keyword2 = "deleteuser";
		expect(HasPermission(abilities, keyword2)).toBe(true);

		const keyword3 = "createloan";
		expect(HasPermission(abilities, keyword3)).toBe(true);

		const keyword4 = "updatereservation";
		expect(HasPermission(abilities, keyword4)).toBe(true);
	});

	it("Don't have permission", () => {
		const abilities = ["canReadBook"];

		const keyword1 = "readuser";
		expect(HasPermission(abilities, keyword1)).toBe(false);

		const keyword2 = "deletebook";
		expect(HasPermission(abilities, keyword2)).toBe(false);

		const keyword3 = "createreservation";
		expect(HasPermission(abilities, keyword3)).toBe(false);

		const keyword4 = "updateloan";
		expect(HasPermission(abilities, keyword4)).toBe(false);
	});

	it("Have permission with multiple keyword", () => {
		const abilities = ["canReadBook", "canCreateUser", "canUpdateLoan"];

		const keyword2 = "readbook";
		expect(HasPermission(abilities, keyword2)).toBe(true);

		const keyword3 = "createuser";
		expect(HasPermission(abilities, keyword3)).toBe(true);

		const keyword4 = "updateloan";
		expect(HasPermission(abilities, keyword4)).toBe(true);
	});

	it("Don't have permission with multiple keyword", () => {
		const abilities = ["canReadBook", "canCreateUser", "canUpdateLoan"];

		const keyword1 = "readuser";
		expect(HasPermission(abilities, keyword1)).toBe(false);

		const keyword2 = "deletebook";
		expect(HasPermission(abilities, keyword2)).toBe(false);

		const keyword3 = "createreservation";
		expect(HasPermission(abilities, keyword3)).toBe(false);

		const keyword4 = "updateloan";
		expect(HasPermission(abilities, keyword4)).toBe(true);
	});

	it("Don't have permission with similar words", () => {
		const abilities = ["canReadBookMark"];

		const keyword1 = "readbook";
		expect(HasPermission(abilities, keyword1)).toBe(false);

		const keyword2 = "readbookmark";
		expect(HasPermission(abilities, keyword2)).toBe(true);
	});

	it("Have permission with multiple keywords", () => {
		const abilities = ["canManageBookRecords"];

		const keyword1 = "readbook";
		const keyword2 = "managebookrecords";
		expect(HasPermission(abilities, keyword1, keyword2)).toBe(true);
	});
});
