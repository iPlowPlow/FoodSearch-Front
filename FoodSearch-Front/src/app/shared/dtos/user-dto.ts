export class UserDTO {
    username: string;
    password: string;
    lastName: string;
    firstName: string;
    token: string;

    constructor(username: string, password: string, lastName: string, firstName: string){
        this.username = username;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
    }
}
