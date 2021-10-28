"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSchema = void 0;
const mongoose = require("mongoose");
exports.PlayerSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    name: String,
    ranking: String,
    rankingPosition: Number,
    urlPicturePlayer: String,
}, { timestamps: true, collection: 'players' });
//# sourceMappingURL=player.schema.js.map