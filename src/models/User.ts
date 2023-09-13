export class User {
    private id: number;
    private username: string;
    private password: string;
    private country: string;
    private firstname: string;
    private lastname: string;
    private role: Role;
  
    constructor(
      id: number = 0,
      username: string = "",
      password: string = "",
      country: string = "",
      firstname: string = "",
      lastname: string = "",
      role: Role = Role.User
    ) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.country = country;
      this.firstname = firstname;
      this.lastname = lastname;
      this.role = role;
    }
  
    get getId(): number {
      return this.id;
    }
  
    set setId(id: number) {
      this.id = id;
    }
  
    get getUsername(): string {
      return this.username;
    }
  
    set setUsername(username: string) {
      this.username = username;
    }
  
    get getPassword(): string {
      return this.password;
    }
  
    set setPassword(password: string) {
      this.password = password;
    }
  
    get getCountry(): string {
      return this.country;
    }
  
    set setCountry(country: string) {
      this.country = country;
    }
  
    get getFirstname(): string {
      return this.firstname;
    }
  
    set setFirstname(firstname: string) {
      this.firstname = firstname;
    }
  
    get getLastname(): string {
      return this.lastname;
    }
  
    set setLastname(lastname: string) {
      this.lastname = lastname;
    }
  
    get getRole(): Role {
      return this.role;
    }
  
    set setRole(role: Role) {
      this.role = role;
    }
  }