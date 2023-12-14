import React from "react";
import { Separator } from "@/components/ui/separator";
import { FLATICON_URL } from "@/constants";

export const Footer: React.FC = () => {
	return (
		<div className="absolute bottom-0 w-full flex flex-row justify-between p-2 bg-background text-primary">
			<p className="text-sm text-muted-foreground break-words w-1/3 self-center">
				<span>{"Icons from "}</span>
				<a
					href={FLATICON_URL}
					title="flaticons"
					className="text-sm self-end"
					rel="noopener noreferrer"
					target="_blank"
				>
					<span>{"Flaticon"}</span>
				</a>
			</p>

			<div className="flex flex-row gap-4">
				<Separator orientation="vertical" />
			</div>
		</div>
	);
};

export default Footer;
