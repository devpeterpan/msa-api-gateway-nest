
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './order.pb';
import { OrderController } from './order.controller';
import {AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME} from "../auth/auth.pb";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ORDER_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('ORDER_SVC_URL'),
            package: ORDER_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/order.proto',
          },
        }),
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
