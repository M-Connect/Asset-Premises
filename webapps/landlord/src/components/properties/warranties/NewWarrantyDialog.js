// NewWarrantyDialog.js
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { TextField } from '@microrealestate/commonui/components';
import { Button } from '../../ui/button';
import ResponsiveDialog from '../../ResponsiveDialog';
import { StoreContext } from '../../../store';
import { toast } from 'sonner';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

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
  isCopyFrom: false,
};

export default function NewWarrantyDialog({ open, setOpen, propertyId }) {
  const { t } = useTranslation('common');
  const store = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const router = useRouter();

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const _onSubmit = useCallback(
    async (warrantyData) => {
      try {
        setIsLoading(true);

        if (!propertyId) {
          toast.error(t('Property ID is missing'));
          return;
        }

        let warranty = {
          ...warrantyData,
        };

        if (warrantyData.isCopyFrom) {
          const { _id, ...originalWarranty } = toJS(
            store.property.items
              .find(({ _id }) => _id === warrantyData.copyFrom)
              .warranties.find(({ _id }) => _id === warrantyData.copyFrom)
          );

          warranty = {
            ...originalWarranty,
            ...warranty,
          };
        }

        console.log('Submitting warranty for property ID:', propertyId);
        console.log('Warranty data:', warranty);

        const { status, data } = await store.property.createWarranty(
          propertyId,
          warranty
        );

        if (status !== 200) {
          switch (status) {
            case 422:
              toast.error(t('Required warranty fields are missing'));
              break;
            case 403:
              toast.error(t('You are not allowed to add a warranty'));
              break;
            case 404:
              toast.error(t('Property not found'));
              break;
            default:
              toast.error(t(`Something went wrong ${status}`));
          }
          return;
        }

        toast.success(t('Warranty created successfully'));
        handleClose();
        store.property.setSelectedWarranty(data);
        store.appHistory.setPreviousPath(router.asPath);
        await router.push(
          `/${store.organization.selected.name}/properties/${propertyId}/warranties/${data._id}`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [store, propertyId, handleClose, router, t]
  );

  return (
    <ResponsiveDialog
      open={!!open}
      setOpen={setOpen}
      isLoading={isLoading}
      renderHeader={() => t('Add a warranty')}
      renderContent={() => (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={_onSubmit}
          innerRef={formRef}
        >
          <Form autoComplete="off">
            <TextField label={t('Name')} name="name" />
            <TextField label={t('Provider')} name="provider" />
            <TextField
              label={t('Covered Items')}
              name="coverageScope.coveredItems"
            />
            <TextField
              label={t('Types of Defects')}
              name="coverageScope.typesOfDefects"
            />
            <TextField
              label={t('Start Date')}
              name="warrantyDuration.startDate"
              type="date"
            />
            <TextField
              label={t('Expiration Date')}
              name="warrantyDuration.expirationDate"
              type="date"
            />
          </Form>
        </Formik>
      )}
      renderFooter={() => (
        <>
          <Button variant="outline" onClick={handleClose}>
            {t('Cancel')}
          </Button>
          <Button
            onClick={() => formRef.current.submitForm()}
            data-cy="submitWarranty"
          >
            {t('Add')}
          </Button>
        </>
      )}
    />
  );
}