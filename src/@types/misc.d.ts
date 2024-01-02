interface SortOption {
	label: string;
	value: string;
}

interface FilterOption {
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
