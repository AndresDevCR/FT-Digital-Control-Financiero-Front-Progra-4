
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/menu') {
      router.push('/menu/show');
    }
  });

  return null;
}