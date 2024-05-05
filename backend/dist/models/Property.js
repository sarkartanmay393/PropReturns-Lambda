"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const propertySchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    pricePerMonth: { type: String, required: true },
    imageUrl: { type: String, required: true },
    carpetArea: { type: String, required: true },
    address: { type: String, required: true },
    isVerified: { type: Boolean },
    seatCount: { type: String },
    furnishings: { type: String },
});
const Property = (0, mongoose_1.model)("Property", propertySchema);
exports.default = Property;
