import { BaseApi } from "./base";
import { FineRoutes } from "./backend-routes";

class FineApi extends BaseApi {
	public ListFine = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.List<Fine[]>(FineRoutes.BASE, q, abortSignal);
	};

	public DeleteFine = (fineID: number, abortSignal?: AbortSignal) => {
		return this.Delete<Fine>(`${FineRoutes.BASE}/${fineID}/`, abortSignal);
	};

	public SettleFine = (fineID: number, abortSignal?: AbortSignal) => {
		return this.Patch<null, Fine>(
			`${FineRoutes.BASE}/${fineID}/${FineRoutes.SETTLE.ROUTE}`,
			null,
			abortSignal,
		);
	};
}

export const fineApi = new FineApi();
