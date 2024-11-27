import { CollectionTypes } from '@microrealestate/types';
import mongoose from 'mongoose';
import Realm from './realm.js';
import WarrantySchema from './warranty.js';

const PropertySchema = new mongoose.Schema<CollectionTypes.Property>({
  realmId: { type: String, ref: Realm },

  type: String,
  name: String,
  description: String,
  surface: Number,
  phone: String,
  digicode: String,
  address: {
    _id: false,
    street1: String,
    street2: String,
    zipCode: String,
    city: String,
    state: String,
    country: String
  },

  price: Number,
  warranties: [WarrantySchema] // Embed the Warranty schema
  // TODO test the Warranty schema and see if it is necessary to embed it here
});

export default mongoose.model<CollectionTypes.Property>(
  'Property',
  PropertySchema
);