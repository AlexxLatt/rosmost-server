import { Controller, Post, UseGuards, Param, Delete } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { BasketResponseInterface } from './types/basketResponse.interface';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}
  @Post('purchase') // измененный путь
  @UseGuards(AuthGuard)
  async purchaseBasket(
    @User('id') userId: number,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.purchaseBasket(userId);
    return this.basketService.buildBasketResponse(basket);
  }
  @Post(':productId')
  @UseGuards(AuthGuard)
  async addProductToBasket(
    @User('id') userId: number,
    @Param('productId') productId: number,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.addProductToBasket(
      userId,
      productId,
    );
    return this.basketService.buildBasketResponse(basket);
  }

  @Delete(':productId')
  @UseGuards(AuthGuard)
  async removeProductFromBasket(
    @User('id') userId: number,
    @Param('productId') productId: number,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.removeProductFromBasket(
      userId,
      productId,
    );
    return this.basketService.buildBasketResponse(basket);
  }

  @Post() // Новый метод для создания корзины
  @UseGuards(AuthGuard)
  async createBasketForUser(
    @User('id') userId: number,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.createBasketForUser(userId);
    return this.basketService.buildBasketResponse(basket);
  }
}
