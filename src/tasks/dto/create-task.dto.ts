import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
