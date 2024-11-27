// WarrantyList.js
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useTranslation from 'next-translate/useTranslation'; // Updated import
import { List } from '../../ResourceList';
import { StoreContext } from '../../../store';
import { fetchWarranties, QueryKeys } from '../../../utils/restcalls';
import { toast } from 'sonner';

function _filterWarranties(data = [], filters) {
  let filteredItems = data;
  
  if (filters.searchText) {
    const regExp = /\s|\.|-/gi;
    const cleanedSearchText = filters.searchText.toLowerCase().replace(regExp, '');
    
    filteredItems = filteredItems.filter(
      ({ name }) => name.replace(regExp, '').toLowerCase().indexOf(cleanedSearchText) !== -1
    );
  }
  return filteredItems;
}

// Changed to named export
export function WarrantyListItem() {
  const { t } = useTranslation('common');
  const store = useContext(StoreContext);
  
  const { data, isError, isLoading } = useQuery({
    queryKey: [QueryKeys.WARRANTIES, store.property.selected._id],
    queryFn: () => fetchWarranties(store.property.selected._id),
    enabled: !!store.property.selected._id
  });

  if (isError) {
    toast.error(t('Error fetching warranties'));
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List
      data={data}
      filterFn={_filterWarranties}
      renderItem={({ item }) => (
        <div className="flex items-center justify-between p-4">
          <span>{item.name}</span>
        </div>
      )}
    />
  );
}

// Use named export
export default WarrantyListItem;