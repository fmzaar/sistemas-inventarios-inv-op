import {Body, Controller, HttpCode, HttpStatus, Post,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginUserDto} from './dto/login-user.dto';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginUserDto) {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto);
    }

}
