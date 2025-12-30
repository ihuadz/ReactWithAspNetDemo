import { Outlet } from 'react-router';

// import Banner from '@/templates/material/components/banner';
import Footer from '@/templates/material/components/footer';
import LenisScroll from '@/templates/material/components/lenis-scroll';
import Navbar from '@/templates/material/components/navbar';

function MainLayout() {
  return (
    <>
      <LenisScroll />
      {/* <Banner /> */}
      <Navbar />
      <main className='px-4'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
