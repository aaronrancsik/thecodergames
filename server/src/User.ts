export class User{
    public name:string;
    public token:string;
    public scoreLevel:Array<number>;
    public code:Array<string>;

    constructor(name:string){
        this.code = [];
        this.name =name;
        this.token ="";
        this.scoreLevel =[0,0,0,0,0];
    }
    
}