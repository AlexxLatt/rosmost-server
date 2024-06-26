import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { ReviewsModule } from './reviews/reviews.module';
import { BasketModule } from './basket/basket.module';
import { ProdutsModule } from './products/products.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    UserModule,
    ReviewsModule,
    BasketModule,
    ProdutsModule,
    ContactModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
