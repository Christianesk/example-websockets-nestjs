import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
