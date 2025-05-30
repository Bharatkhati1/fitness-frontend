// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
// import ThemeSettings from '../components/ThemeSettings/ThemeSettings';
import MainNavbarLeft from '../authorized/AdminUI/MainNavbarLeft/MainNavbarLeft';
import TopBar from '../authorized/AdminUI/TopBar/TopBar';

const MainLayouts = () => {
  return (
    <div className="wrapper admin-pages">
      <MainNavbarLeft />
      <div className="main-content">
        <TopBar />
        <main className="page-content">
          <div className="container-xxl">
            <Outlet />
          </div>
        </main>
      </div>
      {/* <ThemeSettings /> */}
    </div>
  );
}

export default MainLayouts
