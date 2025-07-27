import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    CommentsModule,
    MongooseModule.forRoot('mongodb+srv://mahmmoudzenbarakji:01mahmoud01@threads.6jjrfam.mongodb.net/threads?retryWrites=true&w=majority&appName=threads'),
    UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
