import { Outlet } from "react-router-dom";

// styles
import styles from "./Main.module.scss";

// components
import SubMenu from "./components/SubMenu";

const Main = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <SubMenu />
    </div>
  );
};

export default Main;
