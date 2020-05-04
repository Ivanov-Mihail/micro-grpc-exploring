import { Controller, OnModuleInit, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DriverId } from './interface/driver-by-id.interface';
import { Driver } from './interface/driver.interface';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';

interface TrackingService{
    findOne(data:DriverId):Observable<Driver>;
}

@Controller('driver')
export class DriverController implements OnModuleInit {

    private readonly items: Driver[] = [
        { id: 1, followersCount: 5 },
        { id: 2, followersCount: 10 },
      ];

    private driverService: TrackingService;

    constructor(@Inject('DRIVER_PACKAGE') private readonly client: ClientGrpc ) {}

    onModuleInit() {
        this.driverService = this.client.getService<TrackingService>('TrackingService')
    }

    @GrpcMethod('TrackingService')
    findOne(data: DriverId):Driver{
        return this.items.find(({id})=> id===data.id);
    }
}
