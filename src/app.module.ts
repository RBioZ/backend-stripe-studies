import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';

import Database from '../ormconfig.js';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(Database),
    ConfigModule.forRoot(),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
