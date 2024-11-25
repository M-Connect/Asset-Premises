import * as Yup from 'yup';
import {
  Section,
  SubmitButton,
  TextField,
  DateField
} from '@microrealestate/commonui/components';
import { Form, Formik } from 'formik';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import useTranslation from 'next-translate/useTranslation';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  provider: Yup.string().required(),
  coverageScope: Yup.object().shape({
    coveredItems: Yup.string().required(),
    typesOfDefects: Yup.string().required(),
  }),
  warrantyDuration: Yup.object().shape({
    startDate: Yup.date().required(),
    expirationDate: Yup.date().required(),
  }),
});

const PropertyWarrantiesForm = observer(({ onSubmit }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    name: '',
    provider: '',
    coverageScope: {
      coveredItems: '',
      typesOfDefects: '',
    },
    warrantyDuration: {
      startDate: '',
      expirationDate: '',
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Section label={t('Warranty Information')}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField label={t('Warranty Name')} name="name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label={t('Provider')} name="provider" />
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
                <DateField
                  label={t('Start Date')}
                  name="warrantyDuration.startDate"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateField
                  label={t('Expiration Date')}
                  name="warrantyDuration.expirationDate"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Section>
          <SubmitButton
            size="large"
            label={!isSubmitting ? t('Save') : t('Saving')}
          />
        </Form>
      )}
    </Formik>
  );
});

export default PropertyWarrantiesForm;