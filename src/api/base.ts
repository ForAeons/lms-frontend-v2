import { AxiosError, AxiosResponse } from "axios";
import { cqToUrl } from "@/util";
import { axiosInstance } from "./axios";

/**
 * Base class for all api classes.
 * Makes GET POST PATCH DELETE requests to the backend server.
 * Logs the requests and responses to the console.
 * Sends notifications to the user based on the response.
 * Performs specified on the response / error using the provided handlers.
 * @param R Payload type
 * @param T Response type
 */
export class BaseApi {
	protected Get = <R>(
		url: string,
		abortSignal?: AbortSignal,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
	) => {
		return axiosInstance
			.get<Payload<R>>(`/${url}`, {
				signal: abortSignal,
			})
			.then((res) => {
				if (successHandler) successHandler(res.data);
				return res.data;
			})
			.catch((err: AxiosError<Payload>) => {
				if (!err.response) {
					console.error("No response received");
					return;
				}
				if (errorHandler) {
					errorHandler(err.response.data);
				} else {
					throw err;
				}
			});
	};

	protected List = <R>(
		url: string,
		cq: CollectionQuery,
		abortSignal?: AbortSignal,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
	) => {
		return axiosInstance
			.get<Payload<R>>(`/${url}?${cqToUrl(cq)}`, {
				signal: abortSignal,
			})
			.then((res) => {
				if (successHandler) successHandler(res.data);
				return res.data;
			})
			.catch((err: AxiosError<Payload>) => {
				if (!err.response) {
					console.error("No response received");
					return;
				}
				if (errorHandler) {
					errorHandler(err.response.data);
				} else {
					throw err;
				}
			});
	};

	protected Post = <T, R = T>(
		url: string,
		data: T,
		abortSignal?: AbortSignal,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
	) => {
		return axiosInstance
			.post<Payload<R>>(`/${url}`, data, {
				signal: abortSignal,
			})
			.then((res) => {
				if (successHandler) successHandler(res.data);
				return res.data;
			})
			.catch((err: AxiosError<Payload>) => {
				if (!err.response) {
					console.error("No response received");
					return;
				}
				if (errorHandler) {
					errorHandler(err.response.data);
				} else {
					throw err;
				}
			});
	};

	protected Patch = <T, R = T>(
		url: string,
		data: T,
		abortSignal?: AbortSignal,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
	) => {
		return axiosInstance
			.patch<Payload<R>>(`/${url}`, data, {
				signal: abortSignal,
			})
			.then((res) => {
				if (successHandler) successHandler(res.data);
				return res.data;
			})
			.catch((err: AxiosError<Payload<T>>) => {
				if (!err.response) {
					console.error("No response received");
					return;
				}
				if (errorHandler) {
					errorHandler(err.response.data);
				} else {
					throw err;
				}
			});
	};

	protected Delete = <T, R = T>(
		url: string,
		abortSignal?: AbortSignal,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
	) => {
		return axiosInstance
			.delete<Payload<R>, AxiosResponse<Payload<R>>, T>(`/${url}`, {
				signal: abortSignal,
			})
			.then((res) => {
				if (successHandler) successHandler(res.data);
				return res.data;
			})
			.catch((err: AxiosError<Payload<T>>) => {
				if (!err.response) {
					console.error("No response received");
					return;
				}
				if (errorHandler) {
					errorHandler(err.response.data);
				} else {
					throw err;
				}
			});
	};

	public GetHealth = (abortSignal?: AbortSignal) => {
		return axiosInstance
			.get<unknown, AxiosResponse<Payload>, unknown>("/health", {
				signal: abortSignal,
			})
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				throw error;
			});
	};
}

export const baseApi = new BaseApi();
