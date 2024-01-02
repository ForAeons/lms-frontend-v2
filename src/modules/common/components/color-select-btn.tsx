import React from "react";
import { Paintbrush2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLOR_SELECT_OPTIONS, MD_ICON_SIZE } from "@/constants";
import { useTheme } from "@/components/theme-provider";
import { useIntl } from "react-intl";

export const ColorSelectBtn: React.FC = () => {
	const intl = useIntl();
	const theme = intl.formatMessage({ id: "Pe0ogR", defaultMessage: "Theme" });
	const themes = intl.formatMessage({ id: "Avsnjl", defaultMessage: "Themes" });
	const selectTheme = intl.formatMessage({
		id: "qJ010K",
		defaultMessage: "Select theme",
	});

	const { color, setColor } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="w-full justify-start flex gap-3 focus-visible:ring-transparent"
				>
					<Paintbrush2Icon size={MD_ICON_SIZE} />
					<span className="text-sm font-medium">{theme}</span>
					<div className="w-5 h-5 rounded-full bg-primary" />
					<span className="sr-only">{selectTheme}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-fit">
				<DropdownMenuLabel>{themes}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={color}
					onValueChange={(c) => setColor(c as Color)}
					className="grid grid-cols-3 gap-3"
				>
					{COLOR_SELECT_OPTIONS.map((opt) => (
						<DropdownMenuRadioItem
							key={opt.value}
							value={opt.value}
							className="flex px-6"
						>
							<div
								className="w-7 h-7 rounded-full"
								style={{ backgroundColor: `hsl(${opt.color})` }}
							/>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
