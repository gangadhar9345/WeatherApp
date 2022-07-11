export class Subscription{
    private _city: string;
    private _frequent: string;
    private _country: string;

    constructor(city:string,country:string,frequent:string){
        this._city=city;
        this._country=country;
        this._frequent=frequent;

    }

    public get city(): string {
        return this._city;
    }
    public set city(value: string) {
        this._city = value;
    }
    
    public get country(): string {
        return this._country;
    }
    public set country(value: string) {
        this._country = value;
    }
    
    public get frequent(): string {
        return this._frequent;
    }
    public set frequent(value: string) {
        this._frequent = value;
    }
    
    toJSON(){
        return{
            city:this.city,
            country:this.country,
            frequent:this.frequent
        }
    }
}