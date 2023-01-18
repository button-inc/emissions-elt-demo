'use client';
import { useTranslation } from '@/i18n/client';
import Link from 'next/link';
import { Button, Grid } from '@button-inc/button-theme';
import styles from './page.module.css';

export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  // 👇️ language management, client side
  const { t } = useTranslation(lng, 'auth');
  const loginOptions = [{ title: t('login'), link: '/api/auth/signin' }];
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{t('message')}</h1>{' '}
        <Grid style={{ padding: '2rem' }}>
          <Grid.Row justify="space-around" align="center">
            {loginOptions.map((option) => (
              <Grid.Col key={option.title} span="30">
                <Link href={option.link}>
                  <Button
                    size="large"
                    variant="secondary"
                    style={{ width: '100%' }}
                  >
                    {option.title}
                  </Button>
                </Link>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Grid>
      </main>
    </div>
  );
}
