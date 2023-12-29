import { MANAGE_ALL, PERMISSIONS } from "@/constants/permission";

/**
 * @param abilities Array of abilities of a user
 * @param keywords the key words that a certain role should have
 * @returns whether the user has the permission
 */
export const HasPermission = (
	abilities: string[],
	...keywords: string[]
): boolean => {
	// if the user has the ability to manage all, then they have all permissions
	if (abilities.some((a) => a.toUpperCase().endsWith(MANAGE_ALL.toUpperCase())))
		return true;

	// Check if the user has the ability that matches the of the keyword
	return keywords.some((keyword) =>
		abilities.some((a) => a.toUpperCase().endsWith(keyword.toUpperCase())),
	);
};

export const GetPermissions = (
	abilities: string[],
): Record<string, boolean> => {
	const permissions: Record<string, boolean> = {};

	for (const permission of PERMISSIONS) {
		permissions[permission] = HasPermission(abilities, permission);
	}

	return permissions;
};
