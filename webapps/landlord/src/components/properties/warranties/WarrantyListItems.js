import { useCallback, useContext } from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../ui/button';
import { Card } from '../../components/ui/card';
import NumberFormat from '../../components/NumberFormat';
import { StoreContext } from '../../store';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export default function WarrantyListItem({ warranty }) {
    const router = useRouter();
    const { t } = useTranslation('common');
    const store = useContext(StoreContext);

    const onClick = useCallback(async () => {
        store.appHistory.setPreviousPath(router.asPath);
        await router.push(`/warranties/${warranty._id}`);
    }, [warranty._id, router, store]);

    return (
        <Card className="p-4 cursor-pointer hover:bg-accent/90" onClick={onClick}>
            <div className="flex flex-col md:items-end md:flex-row md:justify-between">
                <div>
                    <Badge
                        variant={warranty.status === 'active' ? 'success' : 'secondary'}
                        className="w-fit border border-secondary-foreground/20"
                    >
                        {warranty.status === 'active' ? t('Active') : t('Expired')}
                    </Badge>
                    <Button
                        variant="link"
                        className="flex items-center font-normal gap-2 p-0 mt-2"
                        data-cy="openWarrantyButton"
                    >
                        <span className="text-xl">{warranty.name}</span>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        {warranty.description}
                    </span>
                </div>

                <div className="md:text-right">
                    <p className="text-sm text-muted-foreground">
                        {t('Warranty Amount')}
                    </p>
                    <div className="text-2xl font-semibold">
                        <NumberFormat value={warranty.amount} />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {warranty.status !== 'active' && (
                    <p className="text-sm text-muted-foreground">
                        {t('Expired on {{expiryDate}}', {
                            expiryDate: warranty.expiryDate
                        })}
                    </p>
                )}
            </div>
        </Card>
    );
}
