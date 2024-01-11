import { BaseApi } from "./base";
import { AuditLogRoutes } from "../backend-routes";

class AuditlogApi extends BaseApi {
	public ListLog = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.List<AuditLogDetailed[]>(AuditLogRoutes.BASE, q, abortSignal);
	};

	public CreateLog = (log: AuditLogCreate, abortSignal?: AbortSignal) => {
		return this.Post<AuditLogCreate, AuditLogDetailed>(
			AuditLogRoutes.BASE,
			log,
			abortSignal,
		);
	};
}

export const auditlogApi = new AuditlogApi();
