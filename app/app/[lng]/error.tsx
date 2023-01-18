'use client';

import { useEffect } from 'react';

function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Something went wrong!</p>
    </div>
  );
}

export default Error;
