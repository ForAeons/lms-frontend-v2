interface SortOption {
	id: string; // used for intl
	label: string;
	value: string;
}

interface FilterOption {
	id: string; // used for intl
	label: string;
	key: string;
	value: string;
}

interface SelectOption<V = string> {
	label: string;
	value: V;
}

type ExtraSelectOption<V = string, E = object> = SelectOption<V> & E;

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
	variant?: BadgeVariant;
	text: string;
}
