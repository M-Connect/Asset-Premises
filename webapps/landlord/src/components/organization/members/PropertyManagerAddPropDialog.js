/* eslint-disable sort-imports */
import { Button } from '../../ui/button';
import { fetchProperties, QueryKeys } from '../../../utils/restcalls';
import { Form, Formik } from 'formik';
import { SelectField } from '../../formfields/SelectField';
import { StoreContext } from '../../../store';
import { useCallback, useContext, useMemo, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PropertyList from '../../properties/PropertyList';
import ResponsiveDialog from '../../ResponsiveDialog';
import useTranslation from 'next-translate/useTranslation';
/* eslint-enable sort-imports */

const memberInitialValues = {};

export default function PropertyManagerAddPropDialog({
  open,
  setOpen,
  data,
  onSave
}) {
  const { t } = useTranslation('common');
  const store = useContext(StoreContext);
  const formRef = useRef();
  const queryClient = useQueryClient();

  const { data: allProperties } = useQuery({
    queryKey: [QueryKeys.PROPERTIES],
    queryFn: () => fetchProperties(store),
    refetchOnMount: 'always',
    retry: 3
  });

  // transform to use it in select field
  const propValues = useMemo(() => {
    return allProperties?.map((prop) => ({
      id: prop._id,
      label:
        prop.name +
        ': ' +
        prop.address?.street1 +
        ', ' +
        prop.address?.city +
        ', ' +
        prop.address?.state,
      value: prop._id
    }));
  }, [allProperties]);

  const memberProperties = useMemo(() => {
    return allProperties?.filter(({ _id }) => data?.properties?.includes(_id));
  }, [allProperties, data]);

  const handleSave = useCallback(() => {
    setOpen(false);
    onSave?.(data);
  }, [setOpen, onSave, data]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSelectChange = useCallback(
    (prop) => {
      if (!data?.properties?.includes(prop)) {
        console.log('Adding Prop to member');
        data.properties.push(prop);
      }
    },
    [data]
  );

  return (
    <ResponsiveDialog
      open={open}
      setOpen={setOpen}
      renderHeader={() => 'Assign Properties'}
      renderContent={() => (
        <Formik
          initialValues={memberInitialValues}
          onSubmit={handleSave}
          innerRef={formRef}
        >
          {() => {
            return (
              <Form autoComplete="off">
                <div className="pt-6 space-y-4">
                  <style jsx>{`
                    @media (min-width: 768px) {
                      .grid.override {
                        grid-template-columns: repeat(
                          1,
                          minmax(0, 1fr)
                        ) !important;
                      }
                    }

                    @media (min-width: 1024px) {
                      .grid.override {
                        grid-template-columns: repeat(
                          1,
                          minmax(0, 1fr)
                        ) !important;
                      }
                    }
                  `}</style>
                  <div>{'Currently Assigned Properties'}</div>
                  <PropertyList data={memberProperties} />
                  <SelectField
                    label={'Select Property To Add'}
                    name="property"
                    values={propValues}
                    onValueChange={handleSelectChange}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
      renderFooter={() => (
        <>
          <Button variant="outline" onClick={handleClose}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSave}>{t('Add')}</Button>
        </>
      )}
    />
  );
}
