import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from './dto/login-user.dto';
import {User} from '../user/entities/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {UserService} from '../user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {
    }

    async signIn(loginUserDto: LoginUserDto) {

        const user = await this.userService.findByEmail(loginUserDto.email)
        if (!user) {
            throw new NotFoundException('Usuario no encontrado')
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = {sub: user.id, username: user.email};
        return {
            access_token: await this.jwtService.signAsync(payload, {expiresIn: '3600s'}),
        };
    }

    async signUp(userDto: CreateUserDto) {
        const user = new User();
        user.email = userDto.email;
        user.password = await bcrypt.hash(userDto.password, 10);
        return this.userService.signUp(user);
    }


}
