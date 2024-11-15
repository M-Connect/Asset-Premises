import * as Yup from 'yup';
import {
  Section,
  SubmitButton,
  TextField,
  DateField
} from '@microrealestate/commonui/components';
import { Form, Formik } from 'formik';
import { useContext, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../store';
import useTranslation from 'next-translate/useTranslation';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  provider: Yup.string().required(),
  expirationDate: Yup.date().required(),
  coverageScope: Yup.object().shape({
    coveredItems: Yup.string().required(),
    typesOfDefects: Yup.string().required()
  }),
  warrantyDuration: Yup.object().shape({
    timeFrame: Yup.string().required(),
    startDate: Yup.date().required()
  }),
  exclusionsAndLimitations: Yup.object().shape({
    excludedItems: Yup.string().required(),
    usageConditions: Yup.string().required()
  }),
  claimProcedures: Yup.object().shape({
    process: Yup.string().required(),
    authorizedServiceCenters: Yup.string().required()
  }),
  consumerResponsibilities: Yup.object().shape({
    maintenanceRequirements: Yup.string().required(),
    properUse: Yup.string().required()
  }),
  remediesProvided: Yup.object().shape({
    repairOrReplacement: Yup.string().required(),
    costCoverage: Yup.string().required()
  }),
  transferability: Yup.object().shape({
    ownershipChanges: Yup.string().required()
  }),
  legalRights: Yup.object().shape({
    stateLaws: Yup.string().required()
  })
});

const PropertyWarrantiesForm = observer(({ onSubmit }) => {
  const { t } = useTranslation('common');
  const store = useContext(StoreContext);

  const initialValues = useMemo(
    () => ({
      name: store.property.selectedWarranty?.name || '',
      provider: store.property.selectedWarranty?.provider || '',
      expirationDate: store.property.selectedWarranty?.expirationDate || '',
      coverageScope: {
        coveredItems: store.property.selectedWarranty?.coverageScope?.coveredItems || '',
        typesOfDefects: store.property.selectedWarranty?.coverageScope?.typesOfDefects || ''
      },
      warrantyDuration: {
        timeFrame: store.property.selectedWarranty?.warrantyDuration?.timeFrame || '',
        startDate: store.property.selectedWarranty?.warrantyDuration?.startDate || ''
      },
      exclusionsAndLimitations: {
        excludedItems: store.property.selectedWarranty?.exclusionsAndLimitations?.excludedItems || '',
        usageConditions: store.property.selectedWarranty?.exclusionsAndLimitations?.usageConditions || ''
      },
      claimProcedures: {
        process: store.property.selectedWarranty?.claimProcedures?.process || '',
        authorizedServiceCenters: store.property.selectedWarranty?.claimProcedures?.authorizedServiceCenters || ''
      },
      consumerResponsibilities: {
        maintenanceRequirements: store.property.selectedWarranty?.consumerResponsibilities?.maintenanceRequirements || '',
        properUse: store.property.selectedWarranty?.consumerResponsibilities?.properUse || ''
      },
      remediesProvided: {
        repairOrReplacement: store.property.selectedWarranty?.remediesProvided?.repairOrReplacement || '',
        costCoverage: store.property.selectedWarranty?.remediesProvided?.costCoverage || ''
      },
      transferability: {
        ownershipChanges: store.property.selectedWarranty?.transferability?.ownershipChanges || ''
      },
      legalRights: {
        stateLaws: store.property.selectedWarranty?.legalRights?.stateLaws || ''
      }
    }),
    [store.property.selectedWarranty]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => {
        return (
          <Form autoComplete="off">
            <Section label={t('Warranty information')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <TextField label={t('Warranty Name')} name="name" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField label={t('Provider')} name="provider" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DateField label={t('Expiration Date')} name="expirationDate" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Coverage Scope')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Covered Items')} name="coverageScope.coveredItems" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Types of Defects')} name="coverageScope.typesOfDefects" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Warranty Duration')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Time Frame')} name="warrantyDuration.timeFrame" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DateField label={t('Start Date')} name="warrantyDuration.startDate" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Exclusions and Limitations')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Excluded Items')} name="exclusionsAndLimitations.excludedItems" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Usage Conditions')} name="exclusionsAndLimitations.usageConditions" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Claim Procedures')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Process')} name="claimProcedures.process" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Authorized Service Centers')} name="claimProcedures.authorizedServiceCenters" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Consumer Responsibilities')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Maintenance Requirements')} name="consumerResponsibilities.maintenanceRequirements" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Proper Use')} name="consumerResponsibilities.properUse" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Remedies Provided')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Repair or Replacement')} name="remediesProvided.repairOrReplacement" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Cost Coverage')} name="remediesProvided.costCoverage" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Transferability')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('Ownership Changes')} name="transferability.ownershipChanges" />
                </Grid>
              </Grid>
            </Section>
            <Section label={t('Legal Rights')}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField label={t('State Laws')} name="legalRights.stateLaws" />
                </Grid>
              </Grid>
            </Section>
            <SubmitButton
              size="large"
              label={!isSubmitting ? t('Save') : t('Saving')}
            />
          </Form>
        );
      }}
    </Formik>
  );
});

export default PropertyWarrantiesForm;