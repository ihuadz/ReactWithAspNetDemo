import { Outlet } from 'react-router';

import { MetadataHandler } from '@/components/MetadataUpdater';

import Footer from '../components/Footer';
import Header from '../components/Header';
// import Lines from '../components/Lines';
import ScrollToTop from '../components/ScrollToTop';

function MainLayout() {
  return (
    <>
      <MetadataHandler />
      {/* <Lines /> */}
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default MainLayout;
