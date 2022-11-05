import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { softDeletePlugin } from './database/mongoose/softDelete/softDelete.plugin';
import { dateRegisterPlugin } from './database/mongoose/dateRegister/dateRegister.plugin';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ 
    MongooseModule.forRootAsync({
        useFactory: () => ({ 
        uri: 'mongodb://localhost/prueba',
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          connection.plugin(dateRegisterPlugin);
          return connection;
        }
      })
    }),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
