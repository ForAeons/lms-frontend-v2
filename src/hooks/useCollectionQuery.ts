import React from "react";
import { useLocation } from "react-router-dom";
import { getCollectionQuery } from "@/util";

export const useCollectionQuery = () => {
	const { search } = useLocation();

	const cq = React.useMemo(() => {
		const params = new URLSearchParams(search);
		return getCollectionQuery(params);
	}, [search]);

	return cq;
};
