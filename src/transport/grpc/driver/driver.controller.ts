import { Controller, OnModuleInit, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DriverDTO } from './dto/driver.dto';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Driver } from './interface/driver.interface';

interface TrackingService{
    findOne(data:DriverDTO):Observable<Driver>;
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
    findOne(data: DriverDTO):Driver{
        return this.items.find(({id})=> id===data.id);
    }
}
