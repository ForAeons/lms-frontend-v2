import React from "react";
import { useNavigate } from "react-router-dom";
import { cqToUrl, isValidCq } from "@/util";

export const useValidateCqOrReroute = (
	cq: CollectionQuery,
	total?: number,
	baseUrl?: string,
) => {
	const navigate = useNavigate();
	React.useEffect(() => {
		const isValid = isValidCq(cq, total);
		if (!isValid) navigate(`${baseUrl ?? ""}?${cqToUrl(cq)}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, window.location.search]);
};
