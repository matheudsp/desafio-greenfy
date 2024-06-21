
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {

    const task = this.tasksRepository.create({ ...createTaskDto });

    return this.tasksRepository.save(task);
  }

  async findAll(status: 'pending' | 'completed'): Promise<Task[]> {
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.where('task.status = :status', { status });
    }

    return query.getMany();
  }
  
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Tarefa com ${id} não encontrada`);
    }

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Tarefa com ${id} não encontrada`);
    }

    await this.tasksRepository.delete(id);
  }
}
