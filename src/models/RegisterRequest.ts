export class RegisterRequest {
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	country: string;

    constructor(
        username: string = "",
        password: string = "",
        firstname: string = "",
        lastname: string = "",
        country: string = "",
    ) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.country = country;
    }
}
