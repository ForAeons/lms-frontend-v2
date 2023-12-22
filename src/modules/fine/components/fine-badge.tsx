import React from "react";
import { Badge } from "@/components/ui/badge";

export const FineBadge: React.FC<{ fine: Fine }> = ({ fine }) => {
	if (fine.status === "outstanding")
		return (
			<Badge variant="destructive" className="w-fit">
				{`Outstanding | amount - ${fine.amount}`}
			</Badge>
		);

	return (
		<Badge variant="secondary" className="w-fit">
			Paid
		</Badge>
	);
};
