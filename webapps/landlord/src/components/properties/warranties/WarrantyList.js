import { EmptyIllustration } from '../../../components/Illustrations';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import WarrantyListItem from './WarrantyListItem';


export default function WarrantyList({ data }) {
  const { t } = useTranslation('common');

  return data.length > 0 ? (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data.map((warranty) => (
        <WarrantyListItem key={warranty._id} warranty={warranty} />
      ))}
    </div>
  ) : (
    <EmptyIllustration label={t('No warranty found')} />
  );
}
