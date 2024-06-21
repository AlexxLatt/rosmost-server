import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'contact' })
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tel: string;

  @Column()
  email: string;

  @Column()
  name: string;
}
