import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewsEntity } from '@app/reviews/reviews.entity';
import { UserEntity } from '@app/user/user.entity';
import { BasketEntity } from '@app/basket/basket.entity';
import { UserProductEntity } from '@app/userProduct/userProduct.entity';
@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  country: string;

  @Column({ default: '' })
  img: string;

  @Column()
  cost: number;

  @Column()
  description: string;

  @Column()
  tags: string;

  @OneToMany(() => ReviewsEntity, (review) => review.product)
  reviews: ReviewsEntity[];

  @Column({ default: false })
  cloned: boolean;

  @ManyToOne(() => BasketEntity, (basket) => basket.products)
  basket: BasketEntity;

  @ManyToMany(() => UserEntity, (user) => user.purchasedProducts)
  users: UserEntity[];

  @Column({ default: false }) // По умолчанию продукт не находится в корзине
  isInBasket: boolean;

  @Column({ default: false }) // По умолчанию продукт не куплен
  isPurchased: boolean;
  @OneToMany(() => UserProductEntity, (userProduct) => userProduct.product)
  userProducts: UserProductEntity[];
  @Column({ nullable: true }) // Добавляем поле для хранения basketId
  basketId: number;
  ProductsEntity: any;

  @Column({ nullable: true }) // Добавляем поле для хранения originalProductId
  originalProductId: number;
}
