import React from "react";
import { useIntl } from "react-intl";
import { BookUserIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { checkoutResThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";

export const ResCheckoutBtn: React.FC<{ res: Reservation }> = ({ res }) => {
	const intl = useIntl();
	const checkoutAction = intl.formatMessage({
		id: "BJ2TKX",
		defaultMessage: "Checkout",
	});

	const dispatch = useAppDispatch();
	const handleCheckout = () => dispatch(checkoutResThunk({ resId: res.id }));
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
						onClick={handleCheckout}
					>
						<BookUserIcon size={LG_ICON_SIZE} className="text-primary" />
						<span className="sr-only">{checkoutAction}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{checkoutAction}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
