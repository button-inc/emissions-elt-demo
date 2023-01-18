import { languages, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n';

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ language management, server side
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, 'help');

  return (
    <>
      <h1> {t('analyst')}</h1>
    </>
  );
}
