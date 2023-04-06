import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
  
    useEffect(() => {
      if (router.pathname === '/inventory') {
        router.push('/inventory/list');
      }
    });
  
    return null;
  }