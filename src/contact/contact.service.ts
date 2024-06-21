import { Injectable, ConflictException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { CreateContactDto } from './dto/createContact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  async createContact(
    createContactDto: CreateContactDto,
  ): Promise<ContactEntity> {
    const existingContact = await this.contactRepository.findOne({
      where: [{ email: createContactDto.email }, { tel: createContactDto.tel }],
    });

    if (existingContact) {
      throw new ConflictException({
        message: 'Контакт с таким email или номером телефона уже существует',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const newContact = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(newContact);
  }

  async getAllContacts(): Promise<ContactEntity[]> {
    return await this.contactRepository.find();
  }

  buildContactResponse(contact: ContactEntity): any {
    return { contact };
  }
}
