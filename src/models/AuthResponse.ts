export class AuthResponse{
    private token: string;

    constructor(token: string = ""){
        this.token = token;
    }

    getToken(): string{
        return this.token;
    }

    setToken(token: string){
        this.token = token;
    }
}