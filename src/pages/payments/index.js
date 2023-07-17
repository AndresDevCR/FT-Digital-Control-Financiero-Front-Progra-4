import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
  
    useEffect(() => {
      if (router.pathname === '/payments') {
        router.push('/payments/list');
      }
    });
  
    return null;
  }