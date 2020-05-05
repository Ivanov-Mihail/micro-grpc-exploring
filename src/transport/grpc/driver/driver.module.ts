import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/transport/grpc/grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DRIVER_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [DriverController]
})
export class DriverModule {}
