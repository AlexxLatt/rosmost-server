import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  readonly name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  readonly email: string;

  @IsNotEmpty({ message: 'Phone number should not be empty' })
  readonly tel: string;
}
