import React from "react";
import { toggleOrder } from "@/util";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from "lucide-react";
import { LG_ICON_SIZE } from "@/constants";

export const OrderBtn: React.FC<{ cq: CollectionQuery }> = ({ cq }) => {
	const navigate = useNavigate();
	return (
		<Button
			variant="ghost"
			className="hover:bg-transparent hover:opacity-50 transition-opacity"
			onClick={() => toggleOrder(navigate, cq)}
		>
			{cq.orderBy === "asc" && <ArrowUpNarrowWideIcon size={LG_ICON_SIZE} />}
			{cq.orderBy === "desc" && <ArrowDownWideNarrowIcon size={LG_ICON_SIZE} />}
		</Button>
	);
};
