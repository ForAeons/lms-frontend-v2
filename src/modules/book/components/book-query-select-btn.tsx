import React from "react";
import { FormattedMessage } from "react-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/components/language-provider";
import { EXTERNAL_BOOK_QUERY_SELECT_OPTIONS } from "@/constants";

export const BookSearchSelect: React.FC<{
	setKey: UnaryHandler<keyof ExternalBookQuery>;
	setValue: UnaryHandler<string>;
}> = ({ setKey, setValue }) => {
	const translate = useTranslations();
	const searchBy = translate.searchBy();

	const onChange = (value: keyof ExternalBookQuery) => {
		setKey(value);
		setValue("");
	};

	return (
		<div className="flex items-center space-x-2">
			<Select onValueChange={onChange}>
				<SelectTrigger className="h-8 w-[150px]">
					<SelectValue placeholder={searchBy} />
				</SelectTrigger>
				<SelectContent>
					{EXTERNAL_BOOK_QUERY_SELECT_OPTIONS.map((s) => (
						<SelectItem key={s.id} value={s.value}>
							<FormattedMessage id={s.id} defaultMessage={s.label} />
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
