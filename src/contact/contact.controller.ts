import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateContactDto } from './dto/createContact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createContact(@Body('contact') createContactDto: CreateContactDto) {
    const contact = await this.contactService.createContact(createContactDto);
    return this.contactService.buildContactResponse(contact);
  }

  @Get()
  async getAllContacts() {
    const contacts = await this.contactService.getAllContacts();
    return { contacts };
  }
}
