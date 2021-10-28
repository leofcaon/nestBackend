"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeSchema = void 0;
const mongoose = require("mongoose");
exports.ChallengeSchema = new mongoose.Schema({
    dateHourChallenge: { type: Date },
    status: { type: String },
    dateHourSolicitation: { type: Date },
    dateHourResponse: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    category: { type: String },
    players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
        }],
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match"
    },
}, { timestamps: true, collection: 'challenges' });
//# sourceMappingURL=challenge.schema.js.map