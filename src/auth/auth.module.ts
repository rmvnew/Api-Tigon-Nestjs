import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtconstants } from './shared/constants';

@Module({
    imports: [UserModule,
        PassportModule,
        JwtModule.register({
            secret:jwtconstants.secret,
            signOptions: {expiresIn: '60s'}
        })],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy],
})
export class AuthModule { }
