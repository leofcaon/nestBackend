import { PlayerSchema } from './interfaces/player.schema';

import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Jogador', schema: PlayerSchema}]) ],
  controllers: [PlayersController],
  providers: [
    PlayersService],
  exports: [PlayersService]
})
export class PlayersModule {}