import { useNavigate } from "react-router-dom";

export const useValidateIntegerOrReroute = (
	value: number | string | undefined,
	baseUrl?: string,
) => {
	const navigate = useNavigate();

	let num: number;
	if (typeof value === "number") num = value;
	else num = parseInt(value ?? "");

	if (isNaN(num)) navigate(baseUrl ?? "");

	return num;
};
