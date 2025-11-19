import { Outlet } from "react-router-dom";

import Styles from "./AdminLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/MainHeader/MainHeader";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";

function AdminLayout() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={Styles.adminContainer}>

      <Sidebar onCollapseChange={setCollapsed} />

      <div className={`
        ${Styles.content}
        ${collapsed ? Styles.collapsedContent : ""}
      `}>
        <Header />
        <div className={Styles.pageContent}>
          <div className={Styles.pageWrapper}>
            <Outlet />
          </div>
          <Footer isCollapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;