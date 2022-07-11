export class User {
    private _name: string;
    private _email: string;
    private _password: string;
    private _address:string;    

    constructor(name: string, email: string, password: string,address:string) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._address=address;
    }

   public get name(): string{
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

   public get email(): string{
        return this._email;
    }

    public set email(email: string) {
        this._email = email
    }

    public get password(): string{
        return this._password;
    }

    public set password(password: string)  {
        this._password = password;
    }

    public get address(): string{
        return this._address;
    }

    public set address(address: string)  {
        this._address = address;
    }

    toJSON(){
        return{
            name:this.name,
            email:this.email,
            password:this.password,
            address:this.address
        }
    }
}