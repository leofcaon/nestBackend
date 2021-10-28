"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSchema = void 0;
const mongoose = require("mongoose");
exports.MatchSchema = new mongoose.Schema({
    category: { type: String },
    players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
        }],
    win: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    result: [
        { set: { type: String } }
    ]
}, { timestamps: true, collection: 'matchs' });
//# sourceMappingURL=match.schema.js.map