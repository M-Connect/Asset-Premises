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
  expirationDate: Yup.date().required()
});

const PropertyWarrantiesForm = observer(({ onSubmit }) => {
  const { t } = useTranslation('common');
  const store = useContext(StoreContext);

  const initialValues = useMemo(
    () => ({
      name: store.property.selectedWarranty?.name || '',
      provider: store.property.selectedWarranty?.provider || '',
      expirationDate: store.property.selectedWarranty?.expirationDate || ''
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