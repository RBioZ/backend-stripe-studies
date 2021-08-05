import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/products/payment')
  createPaymentIntent(@Body body: any) {
    this.productsService.createPaymentIntent(body);
  }
}
