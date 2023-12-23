import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AuditLogCard: React.FC<{ log: AuditLogDetailed }> = ({ log }) => {
	return (
		<Card className="border-none hover:shadow-md transition-shadow flex p-3 gap-3">
			<Badge className="w-fit">{`By ${log.user.username}`}</Badge>
			<p>{log.action}</p>
		</Card>
	);
};
