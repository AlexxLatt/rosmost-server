import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from '@app/products/products.entity';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { UserProductEntity } from '@app/userProduct/userProduct.entity';
import { ProductsService } from '@app/products/products.service';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactEntity } from './contact.entity';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [TypeOrmModule.forFeature([ContactEntity])],
})
export class ContactModule {}
