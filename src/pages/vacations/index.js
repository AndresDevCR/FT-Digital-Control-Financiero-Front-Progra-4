import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
  
    useEffect(() => {
      if (router.pathname === '/vacations') {
        router.push('/vacations/list');
      }
    });
  
    return null;
  }