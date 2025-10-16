import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../store';
import { useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import WarrantyForm from './WarrantyForm';

const NewWarrantyDialog = observer(({ open, onClose }) => {
  const { t } = useTranslation('common');
  const store = useContext(StoreContext);

  const handleSubmit = async (values) => {
    await store.warranty.create(values);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('Add New Warranty')}</DialogTitle>
      <DialogContent>
        <WarrantyForm onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
});

export default NewWarrantyDialog;