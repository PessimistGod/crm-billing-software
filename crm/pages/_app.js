import '@/styles/globals.css'
import Navbar from '@/Components/Navbar'
import Sidebar from '@/Components/Sidebar'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import LogNav from '@/Components/LogoutNav';
export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  const [registration, setRegistration] = useState('');

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setRegistration(token);
    

  } else {
    setRegistration('');
  }
}, [router]);



return (
  <>
    {registration ? (
      <>
        <Sidebar />
        <Navbar />
      </>
    ) : <><LogNav/>
    </>}
    <Component {...pageProps} />
  </>
)
    }