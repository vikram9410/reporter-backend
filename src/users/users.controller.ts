import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User has been successfully registered',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      }
    }
  })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ 
    status: 200, 
    description: 'User has been successfully logged in',
    schema: {
      example: {
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user'
        },
        token: 'jwt-token-here'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user'
        }
      }
    }
  })
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req) {
    // This would typically use JWT authentication
    return { user: req.user };
  }
} 