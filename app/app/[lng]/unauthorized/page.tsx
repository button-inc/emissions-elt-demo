'use client';
import { useTranslation } from '@/i18n/client';

export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ client language management
  const { t } = useTranslation(lng, 'unauth');
  return (
    <>
      <h1>⛔️ {t('message')}</h1>
    </>
  );
}
