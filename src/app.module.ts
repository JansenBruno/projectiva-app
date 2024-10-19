import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SquadModule } from './squad/squad.module';  // Importando o módulo do Squad
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [PrismaModule, SquadModule, AuthModule, TaskModule],  // Adicione o SquadModule aqui
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
