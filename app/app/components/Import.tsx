'use client';
import { useTranslation } from '@/i18n/client';

export default function Import({ lng }) {
  // 👇️ language management, client side
  const { t } = useTranslation(lng, 'import');

  return (
    <>
      <h1> {t('message')}</h1>
    </>
  );
}
