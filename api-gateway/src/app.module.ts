import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:phQtWtDDiFaJVg8H@cluster0.3mmn8.mongodb.net/apigateway?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }),
    PlayersModule,
    CategoriesModule,
    ChallengesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

