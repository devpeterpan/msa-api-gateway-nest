import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './product.pb';
import { ProductController } from './product.controller';
import {ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME} from "../order/order.pb";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCT_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('PRODUCT_SVC_URL'),
            package: PRODUCT_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/product.proto',
          },
        }),
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
