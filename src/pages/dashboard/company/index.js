import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
  
    useEffect(() => {
      if (router.pathname === '/dashboard/company') {
        router.push('/dashboard/application/company/list');
      }
    });
  
    return null;
  }