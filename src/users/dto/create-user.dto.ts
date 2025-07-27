import { IsNumber, IsString, isString,IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()

    @IsString()
    name:String;
    lastname:String;
    @IsNumber()
    age:number;
} 
