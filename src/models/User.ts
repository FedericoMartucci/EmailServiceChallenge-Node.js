import { Role } from "./Role";
export class User {
    private id: number | undefined;
    private username: string;
    private password: string;
    private country: string;
    private firstname: string;
    private lastname: string;
    private role: Role;
  
    constructor(
      username: string = "",
      password: string = "",
      country: string = "",
      firstname: string = "",
      lastname: string = "",
      role: Role = Role.USER,
      id?: number
    ){
      this.id = id;
      this.username = username;
      this.password = password;
      this.country = country;
      this.firstname = firstname;
      this.lastname = lastname;
      this.role = role;
    }
  
    //Getters
    getId(): number | undefined {
      return this.id;
    }
    
    getUsername(): string{
      return this.username;
    }

    getPassword(): string{
      return this.password;
    }

    getCountry(): string{
      return this.country;
    }
    
    getFirstname(): string{
      return this.firstname;
    }
    
    getLastname(): string{
      return this.lastname;
    }
    
    getRole(): Role {
      return this.role;
    }


    //Setters
    setId(id: number){
      this.id = id;
    }
  
    setUsername(username: string){
      this.username = username;
    }
  
    setPassword(password: string){
      this.password = password;
    }

    setCountry(country: string){
      this.country = country;
    }

    setFirstname(firstname: string){
      this.firstname = firstname;
    }
    
    setLastname(lastname: string){
      this.lastname = lastname;
    }
    
    setRole(role: Role){
      this.role = role;
    }
  }