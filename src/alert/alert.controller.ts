import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AlertGateway } from './alert.gateway';
import { AlertDto } from './dto/alert.dto';

@Controller('alert')
export class AlertController {

    constructor(private alertGateway: AlertGateway){}

    @Post()
    @HttpCode(200)
    sendAlertToAll(@Body() dto: AlertDto){
        this.alertGateway.sendToAll(dto.message);
        return dto
    }
}
