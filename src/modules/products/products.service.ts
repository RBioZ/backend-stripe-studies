import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Stripe from 'stripe';

@Injectable()
export class ProductsService {
  stripe = new Stripe(
    'sk_test_51JKQNoAhUJiT8Mhhd64skjL8VpkoagJ6NMtwLgOKBrrbL582yAbwE9giaXaz2bdoX1oxDoJYmSV9marlSSsi9zzo00opIcCk5w',
    {
      apiVersion: '2020-08-27',
      typescript: true,
    },
  );

  findAll() {
    return this.stripe.products.list();
  }

  async createPaymentIntent(currency, paymentMethodType) {
    // Create a PaymentIntent with the order amount and currency.
    const params: Stripe.PaymentIntentCreateParams = {
      amount: 1999,
      currency,
      payment_method_types: [paymentMethodType],
    };

    // If this is for an ACSS payment, we add payment_method_options to create
    // the Mandate.
    if (paymentMethodType === 'acss_debit') {
      params.payment_method_options = {
        acss_debit: {
          mandate_options: {
            payment_schedule: 'sporadic',
            transaction_type: 'personal',
          },
        },
      };
    }

    try {
      const paymentIntent: Stripe.PaymentIntent =
        await this.stripe.paymentIntents.create(params);

      // Send publishable key and PaymentIntent client_secret to client.
      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (e) {
      return {
        error: {
          message: e.message,
        },
      };
    }
  }
}
