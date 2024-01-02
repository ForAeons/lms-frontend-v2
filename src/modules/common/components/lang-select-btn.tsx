import React from "react";
import { useIntl } from "react-intl";
import { LanguagesIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/components/language-provider";
import { LOCALE_SELECT_OPTIONS, MD_ICON_SIZE } from "@/constants";

export const LangSelectBtn: React.FC = () => {
	const intl = useIntl();
	const selectAppLanguage = intl.formatMessage({
		id: "LKP2kK",
		defaultMessage: "Select app language",
	});

	const { locale, setLocale } = useLocale();
	return (
		<Select defaultValue={locale} onValueChange={(l) => setLocale(l as Locale)}>
			<SelectTrigger className="w-full h-10 px-4 py-2 focus:ring-transparent border-none hover:bg-accent hover:text-accent-foreground">
				<div className="flex w-full gap-3">
					<LanguagesIcon size={MD_ICON_SIZE} />
					<SelectValue placeholder="Select a timezone" />
					<span className="sr-only">{selectAppLanguage}</span>
				</div>
			</SelectTrigger>

			<SelectContent>
				{LOCALE_SELECT_OPTIONS.map((opt) => (
					<SelectItem key={opt.value} value={opt.value}>
						<p className="text-sm font-medium">{opt.label}</p>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
