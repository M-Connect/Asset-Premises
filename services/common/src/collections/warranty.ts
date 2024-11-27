import { CollectionTypes } from '@microrealestate/types';
import mongoose from 'mongoose';
import Realm from './realm.js';
import Property from './property.js';

const WarrantySchema = new mongoose.Schema<CollectionTypes.Warranty>({
  realmId: { type: String, ref: Realm },
  propertyId: { type: String, ref: Property },
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  amount: Number,
  provider: String
});

export default mongoose.model<CollectionTypes.Warranty>('Warranty', WarrantySchema);
