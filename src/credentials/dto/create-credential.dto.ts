import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCredentialDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
