export class RegisterRequest {
	private username: string;
	private password: string;
	private firstname: string;
	private lastname: string;
	private country: string;

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

    // Getters
    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getFirstname(): string {
        return this.firstname;
    }

    getLastname(): string {
        return this.lastname;
    }

    getCountry(): string {
        return this.country;
    }

    // Setters
    setUsername(username: string){
        this.username = username;
    }

    setPassword(password: string){
        this.password = password;
    }

    setFirstname(firstname: string){
        this.firstname = firstname;
    }

    setLastname(lastname: string){
        this.lastname = lastname;
    }

    setCountry(country: string){
        this.country = country;
    }

}
