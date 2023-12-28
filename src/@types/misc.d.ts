interface SortOption {
	label: string;
	value: string;
}

interface FilterOption {
	label: string;
	key: string;
	value: string;
}

interface SelectOption {
	label: string;
	value: string;
}

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
	variant?: BadgeVariant;
	text: string;
}
