import mongoose from 'mongoose';
import { CollectionTypes } from '@microrealestate/types';

const WarrantySchema = new mongoose.Schema<CollectionTypes.Warranty>({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  coverageScope: {
    coveredItems: { type: String, required: true },
    typesOfDefects: { type: String, required: true }
  },
  warrantyDuration: {
    timeFrame: { type: String, required: true },
    startDate: { type: Date, required: true }
  },
  exclusionsAndLimitations: {
    excludedItems: { type: String, required: true },
    usageConditions: { type: String, required: true }
  },
  claimProcedures: {
    process: { type: String, required: true },
    authorizedServiceCenters: { type: String, required: true }
  },
  consumerResponsibilities: {
    maintenanceRequirements: { type: String, required: true },
    properUse: { type: String, required: true }
  },
  remediesProvided: {
    repairOrReplacement: { type: String, required: true },
    costCoverage: { type: String, required: true }
  },
  transferability: {
    ownershipChanges: { type: String, required: true }
  },
  legalRights: {
    stateLaws: { type: String, required: true }
  }
});

export default WarrantySchema;