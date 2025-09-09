import React from "react";
import { Loader } from "@mantine/core";

import styles from "./Spinner.module.scss";

interface IProps {}

const Spinner: React.FC<IProps> = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <Loader color="var(--main-yellow)" type="oval" />
    </div>
  );
};

export default Spinner;
