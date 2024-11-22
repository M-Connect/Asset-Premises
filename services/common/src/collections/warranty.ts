import mongoose from 'mongoose';
import { CollectionTypes } from '@microrealestate/types';

const WarrantySchema = new mongoose.Schema<CollectionTypes.Warranty>({
  name: { type: String, required: true }, // Warranty Name
  provider: { type: String, required: true }, // Provider

  coverageScope: {
    coveredItems: { type: String, required: true }, // Covered Items
    typesOfDefects: { type: String, required: true }, // Types of Defects
  },

  warrantyDuration: {
    startDate: { type: Date, required: true }, // Start Date
    expirationDate: { type: Date, required: true }, // Expiration Date
  },
});

export default WarrantySchema;