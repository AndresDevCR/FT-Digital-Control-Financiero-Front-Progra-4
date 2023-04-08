import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter();
  
    useEffect(() => {
      if (router.pathname === '/upload-files') {
        router.push('/upload-files/file-upload');
      }
    });
  
    return null;
  }