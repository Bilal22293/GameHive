// // src/components/ClientWrapper.tsx
// 'use client';

// import { useEffect } from 'react';

// export default function ClientWrapper({
//   appSessionId,
//   children,
// }: {
//   appSessionId: string;
//   children: React.ReactNode;
// }) {
//   useEffect(() => {
//     const storedSessionId = localStorage.getItem('lastAppSessionId');

//     if (storedSessionId !== appSessionId) {
//       // New app session → clear storage
//       localStorage.clear();
//       localStorage.setItem('lastAppSessionId', appSessionId);
//     }
//   }, [appSessionId]);

//   return <>{children}</>;
// }
// src/components/ClientWrapper.tsx
'use client';

import { useEffect } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const hasCleared = localStorage.getItem('hasClearedStorage');

    if (!hasCleared) {
      localStorage.clear(); // Clear everything once
      localStorage.setItem('hasClearedStorage', 'true');
    }
  }, []);

  return <>{children}</>;
}

