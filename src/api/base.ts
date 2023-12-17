import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import * as Constants from "@/constants";

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	// Intercepts all requests and logs them to the console and displays the backend message to the user
	(res: AxiosResponse<Payload>) => {
		// Logs the url, method and url of the request
		console.info(`[${res.config.method?.toUpperCase()}]: ${res.config.url}`);
		// Displays the backend message to the user
		return res;
	},
	// Intercepts all errors and logs them to the console and displays the backend message to the user
	(err: AxiosError<Payload>) => {
		if (axios.isCancel(err)) {
			console.info("Request canceled - ", err.message);
		}

		// Logs the url, method and url of the request
		console.error(`[${err.config?.method?.toUpperCase()}]: ${err.config?.url}`);
		console.error("Error: ", err);

		// Toast error
		if (err.response !== undefined) {
			const response = err.response;
			for (let i = 0; i < response.data.messages.length; i++) {
				setTimeout(() => {
					toast({
						variant: "destructive",
						title: "Action failed",
						description: response.data.messages[i].message,
					});
				}, i * 100);
			}
		}

		return Promise.reject(err);
	},
);

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
	private BASE_URL = Constants.BACKEND_BASE_URL;

	protected Get = <R>(
		url: string,
		abortSignal?: AbortSignal,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
	) => {
		return axios
			.get<Payload<R>>(`${this.BASE_URL}/${url}`, {
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
		return axios
			.get<Payload<R>>(`${this.BASE_URL}/${url}?${cq.toString()}`, {
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
		return axios
			.post<Payload<R>>(`${this.BASE_URL}/${url}`, data, {
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
		return axios
			.patch<Payload<R>>(`${this.BASE_URL}/${url}`, data, {
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
		return axios
			.delete<Payload<R>, AxiosResponse<Payload<R>>, T>(
				`${this.BASE_URL}/${url}`,
				{
					signal: abortSignal,
				},
			)
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
		return axios
			.get<unknown, AxiosResponse<Payload>, unknown>(
				`${Constants.BACKEND_BASE_URL}/health`,
				{
					signal: abortSignal,
				},
			)
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				throw error;
			});
	};
}

export const baseApi = new BaseApi();
