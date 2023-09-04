import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [PrismaModule, UsersModule, CredentialsModule, NotesModule, CardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
