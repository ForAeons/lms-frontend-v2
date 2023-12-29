/**
 * Person is the basic person object
 * @property id - the person's id
 * @property full_name - the person's full name
 * @property preferred_name - the person's preferred name
 */
interface Person {
	id: number;
	full_name: string;
	preferred_name?: string;
}

type PersonCreate = Omit<Person, "id">;
