import { Schema, Types, model } from "mongoose";

export interface IProperty {
  pricePerMonth: string;
  imageUrl: string;
  carpetArea: string;
  address: string;
  description: string;
  isVerified?: boolean;
  seatCount?: string;
  furnishings?: string;
}

const propertySchema = new Schema<IProperty>({
  description: { type: String, required: true },
  pricePerMonth: { type: String, required: true },
  imageUrl: { type: String, required: true },
  carpetArea: { type: String, required: true },
  address: { type: String, required: true },
  isVerified: { type: Boolean },
  seatCount: { type: String },
  furnishings: { type: String },
});

const Property = model<IProperty>("Property", propertySchema);

export default Property;
