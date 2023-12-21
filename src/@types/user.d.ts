/**
 * User is the basic user object
 * @property id - the user's id
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 */
interface User {
	id: number;
	username: string;
	email?: string;
	password: string;
}

type UserLogin = Omit<User, "id" | "email">;

/**
 * UserCreate is the object used to create a new user
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 * @property person_attributes - the user's person object
 */
interface UserPersonCreate extends Omit<User, "id"> {
	person_attributes: PersonCreate;
}

/**
 * UserUpdate is the object used to update a user
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 */
type UserUpdate = Partial<UserCreate>;

/**
 * UserPerson is a combination of User and Person
 * @property id - the user's id
 * @property username - the user's username
 * @property email - the user's email
 * @property password - the user's password
 * @property person_attributes - the user's person object
 */
interface UserPerson extends User {
	person_attributes: Person;
}

type UserPayload = Omit<UserPerson, "password">;

interface UserPersonAbility extends UserPerson {
	abilities: string[];
}

type UserSimple = Omit<User, "email" | "password">;

interface GetCurrentUserPayload {
	is_logged_in: boolean;
	user: UserPersonAbility;
}
