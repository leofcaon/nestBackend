import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

import { ChallengeStatus } from './challenge-status.enum'

export interface Challenge extends Document {

    dateHourChallenge: Date
    status: ChallengeStatus
    dateHourSolicitation: Date
    dateHourResponse: Date
    requester: Player
    category: string
    players: Array<Player>
    match: Match  
}

export interface Match extends Document{
    category: string
    players: Array<Player>
    win: Player
    result: Array<Result>  
}

export interface Result {
    set: string
}