// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//     imports:[ 
//       JwtModule.registerAsync({
//         useFactory: (config: ConfigService) => {
//           return {
//             secret: config.get<string>('JWT_SECRET_KEY'),
//             signOptions: {
//               expiresIn: config.get<string | number>('JWT_SECRET_KEY_EXPIRES'),
//             },
//           };
//         },
//         inject: [ConfigService],
//       }),
//     ],
//     exports:[JwtModule]  
// })
// export class CommonModule {}
