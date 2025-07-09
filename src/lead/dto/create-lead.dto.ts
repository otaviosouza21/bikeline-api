import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsOptional()
  @IsDateString()
  dt_nascimento?: string;
}
