import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/tasks.entity';
import { JwtModule } from '@nestjs/jwt'; 
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Your JWT secret key
      signOptions: { expiresIn: '30d' }, // Token expiration
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService,JwtAuthGuard],
  exports: [TasksService],
})
export class TasksModule {}