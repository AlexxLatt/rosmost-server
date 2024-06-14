import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketEntity } from './basket.entity';
import { ProductsEntity } from '@app/products/products.entity';
import { UserEntity } from '@app/user/user.entity';
import { UserProductEntity } from '@app/userProduct/userProduct.entity';
import { BasketResponseInterface } from './types/basketResponse.interface';
import { ProductsService } from '@app/products/products.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity)
    private basketRepository: Repository<BasketEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UserProductEntity)
    private userProductRepositry: Repository<UserProductEntity>,
  ) {}

  async createBasketForUser(userId: number): Promise<BasketEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let basket = await this.basketRepository.findOne({
      where: { user },
      relations: ['products'],
    });
    if (!basket) {
      basket = this.basketRepository.create({ user, products: [] });
      basket = await this.basketRepository.save(basket);
      user.basketId = basket.id;
      await this.userRepository.save(user); // Сохраняем пользователя
    } else {
      // Если корзина уже существует, просто вернем ее
      return basket;
    }
    // После сохранения пользователя вернем корзину
    return basket;
  }

  async addProductToBasket(userId: number, productId: number) {
    const basket = await this.createBasketForUser(userId);
    const originalProduct = await this.productsRepository.findOne(productId);
    if (!originalProduct) {
      throw new NotFoundException('Продукт не найден');
    }
    // Проверяем, был ли уже куплен этот продукт
    if (originalProduct.isPurchased) {
      throw new ConflictException('Продукт уже был куплен');
    }
    // Проверяем, есть ли уже такой продукт в корзине пользователя
    const existingProduct = basket.products.find(
      (p) => p.originalProductId === productId,
    );
    if (existingProduct) {
      throw new ConflictException('Продукт уже находится в корзине');
    }
    // Клонируем продукт для пользователя
    const clonedProduct = new ProductsEntity();
    clonedProduct.title = originalProduct.title;
    clonedProduct.country = originalProduct.country;
    clonedProduct.cost = originalProduct.cost;
    clonedProduct.description = originalProduct.description;
    clonedProduct.tags = originalProduct.tags;
    clonedProduct.img = originalProduct.img;
    clonedProduct.cloned = true;
    clonedProduct.isInBasket = true;
    clonedProduct.basketId = basket.id;
    clonedProduct.originalProductId = originalProduct.id; // Связываем с оригинальным продуктом
    await this.productsRepository.save(clonedProduct); // Сохраняем клон продукта
    basket.products.push(clonedProduct);
    // Сохраняем корзину с клонированным продуктом
    await this.basketRepository.save(basket);
    // Найти максимальный ID продукта в таблице продуктов
    return basket;
  }

  // basket.service.ts

  async purchaseBasket(userId: number): Promise<BasketEntity> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['basket', 'basket.products'],
    });
    if (!user || !user.basket) {
      throw new NotFoundException('Корзина не найдена');
    }

    const basket = user.basket;

    // Создаем записи в UserProductEntity для каждого продукта
    for (const product of basket.products) {
      const userProduct = new UserProductEntity();
      userProduct.user = user;
      userProduct.product = product;
      userProduct.isPurchased = true;
      await this.userProductRepositry.save(userProduct);
    }

    // Обновляем статус продуктов в корзине
    basket.products.forEach((product) => {
      product.isInBasket = false;
      product.isPurchased = true;
    });

    // Сохраняем обновленные продукты и корзину
    await this.productsRepository.save(basket.products);
    await this.basketRepository.save(basket);

    return basket;
  }

  async removeProductFromBasket(
    userId: number,
    productId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['basket', 'basket.products'],
    });

    if (!user || !user.basket) {
      throw new NotFoundException('Корзина не найдена');
    }

    const basket = user.basket;

    // Убедимся, что продукты корзины успешно загружены
    if (basket.products.length === 0) {
      throw new NotFoundException('Продукты не найдены в корзине');
    }
    console.log(basket.products);
    // Находим продукт, который нужно удалить
    const productToRemoveIndex = basket.products.findIndex(
      (product) => product.id === +productId,
    );

    if (productToRemoveIndex === -1) {
      throw new NotFoundException('Продукт не найден в корзине');
    }

    const productToRemove = basket.products[productToRemoveIndex];

    // Устанавливаем isInBasket в false для удаленного продукта
    productToRemove.isInBasket = false;

    // Удаляем продукт из массива
    basket.products.splice(productToRemoveIndex, 1);

    try {
      // Сохраняем обновленную информацию о продукте
      await this.productsRepository.save(productToRemove);
    } catch (error) {
      console.error('Ошибка при сохранении продукта:', error);
      throw new InternalServerErrorException('Ошибка при сохранении продукта');
    }

    try {
      // Сохраняем изменения корзины
      await this.basketRepository.save(basket);
      console.log('Корзина успешно сохранена');
    } catch (error) {
      console.error('Ошибка при сохранении корзины:', error);
      throw new InternalServerErrorException('Ошибка при сохранении корзины');
    }

    console.log('Корзина после удаления продукта:', basket);
  }

  buildBasketResponse(basket): BasketResponseInterface {
    return { basket };
  }
}
