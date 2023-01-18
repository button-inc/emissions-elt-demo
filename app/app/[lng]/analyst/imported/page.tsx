import { Suspense } from 'react';
import { languages, fallbackLng } from '@/i18n/settings';
import { useTranslation } from '@/i18n';
import { columns, query } from '@/lib/interfaces/imported';
import TableQuery from '@/components/table/TableQuery';

// 👇️ graphQL query
const endpoint = 'api/analyst/graphql';

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  try {
    // 👇️ language management, server side
    if (languages.indexOf(lng) < 0) lng = fallbackLng;
    const { t } = await useTranslation(lng, 'imported');
    // 👇️ translate column titles
    columns.map((column, index) => {
      column.title = t('column' + index.toString());
    });
    // 👉️ return: table with query data
    return (
      <>
        <div>
          <h1>{t('message')}</h1>
          <Suspense fallback="...">
            {/* @ts-expect-error Async Server Component */}
            <TableQuery
              endpoint={endpoint}
              query={query}
              columns={columns}
            ></TableQuery>
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    return (
      <h1>
        API RESPONSE: {error.response.status}
        {error.response.error
          ? error.response.error
          : error.response.errors && error.response.errors.length
          ? error.response.errors[0].message
          : ''}
      </h1>
    );
  }
}
