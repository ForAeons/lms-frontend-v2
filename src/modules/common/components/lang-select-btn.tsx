import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LOCALE_SELECT_OPTIONS, MD_ICON_SIZE } from "@/constants";
import { useLocale } from "@/components/language-provider";
import { LanguagesIcon } from "lucide-react";

export const LangSelectBtn: React.FC = () => {
	const { locale, setLocale } = useLocale();
	return (
		<Select defaultValue={locale} onValueChange={(l) => setLocale(l as Locale)}>
			<SelectTrigger className="w-full h-10 px-4 py-2 focus:ring-transparent border-none hover:bg-accent hover:text-accent-foreground">
				<div className="flex w-full gap-3">
					<LanguagesIcon size={MD_ICON_SIZE} />
					<SelectValue placeholder="Select a timezone" />
				</div>
			</SelectTrigger>

			<SelectContent>
				{LOCALE_SELECT_OPTIONS.map((opt) => (
					<SelectItem key={opt.value} value={opt.value}>
						{opt.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
