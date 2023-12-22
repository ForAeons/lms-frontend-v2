import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import * as Constants from "@/constants";
import { store } from "@/store";

export const axiosInstance = axios.create({
	baseURL: Constants.BACKEND_BASE_URL,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const csrfToken = store.getState().app.csrfToken;

		if (csrfToken) {
			// Set the CSRF token header
			config.headers["X-Csrf-Token"] = csrfToken;
		}

		return config;
	},
	(error) => {
		// Handle request error
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	// Intercepts all requests and logs them to the console and displays the backend message to the user
	(res: AxiosResponse<Payload>) => {
		if (Constants.ENV === "development") {
			// Logs the url, method and url of the request
			console.info(`[${res.config.method?.toUpperCase()}]: ${res.config.url}`);
		}
		return res;
	},
	// Intercepts all errors and logs them to the console and displays the backend message to the user
	(err: AxiosError<Payload>) => {
		if (Constants.ENV === "development") {
			if (axios.isCancel(err)) {
				console.info("Request canceled - ", err.message);
			}

			// Logs the url, method and url of the request
			console.error(
				`[${err.config?.method?.toUpperCase()}]: ${err.config?.url}`,
			);
			console.error("Error: ", err);
		}

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
