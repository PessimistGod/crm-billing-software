import '@/styles/globals.css'
import LeftMenu from '@/Components/leftMenu'
import Navbar from '@/Components/Navbar'
import Sidebar from '@/Components/Sidebar'

export default function App({ Component, pageProps }) {

  return <>
{/* <div className='flex'>
      <LeftMenu />
    </div> */}
    <Sidebar />
    <Navbar />
    <Component {...pageProps} />
  </>
}
