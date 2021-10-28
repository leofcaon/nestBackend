"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    category: { type: String, unique: true },
    description: { type: String },
    events: [
        {
            name: { type: String },
            operation: { type: String },
            value: { type: Number }
        }
    ],
    players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
        }]
}, { timestamps: true, collection: 'categories' });
//# sourceMappingURL=category.schema.js.map