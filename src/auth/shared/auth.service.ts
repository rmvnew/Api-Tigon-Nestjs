/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    async validateUser(userEmail: string, userPassword: string) {

        const user = await this.userService.findByEmail(userEmail)

        // console.log(user)
        // console.log('Senha digitada: ',userPassword)
        // console.log('Senha do banco: ',user.password)

        if (user && this.checkPassword(userPassword,user.password)) {
            const { idUser, name, email } = user
            return { idUser, name, email }
        }
        return null

    }

    async checkPassword(password: string, passwordHash: string):Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
