import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
  
    useEffect(() => {
      if (router.pathname === '/dashboard/employee') {
        router.push('/dashboard/employee/list');
      }
    });
  
    return null;
  }