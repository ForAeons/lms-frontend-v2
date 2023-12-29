import { RootState } from "../store";

export const CheckPermission = (state: RootState, ...keywords: string[]) => {
	for (const keyword of keywords) {
		const permission = state.app.permissions[keyword];
		if (permission) return true;
	}

	return false;
};
