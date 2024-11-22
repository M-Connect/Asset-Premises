import { EmptyIllustration } from '../../components/Illustrations';
import WarrantyListItem from './WarrantyListItem';
import useTranslation from 'next-translate/useTranslation';

export default function WarrantyList({ data }) {
    const { t } = useTranslation('common');

    return data.length > 0 ? (
        <ul>
            {data.map((warranty) => (
                <li key={warranty._id} className="mb-3 last:mb-0">
                    <WarrantyListItem warranty={warranty} />
                </li>
            ))}
        </ul>
    ) : (
        <EmptyIllustration label={t('No warranties found')} />
    );
}