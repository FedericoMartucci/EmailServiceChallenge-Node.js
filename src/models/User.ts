import { Role } from "./Role";
export class User {
    id: number | undefined;
    username: string;
    password: string;
    country: string;
    firstname: string;
    lastname: string;
    role: Role;
  
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
  }