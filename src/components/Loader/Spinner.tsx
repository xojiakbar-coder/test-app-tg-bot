import React from "react";
import { Loader } from "@mantine/core";

import styles from "./Spinner.module.scss";

interface IProps {}

const SpinnerLoader: React.FC<IProps> = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <Loader color="var(--tg-theme-accent-text-color)" />
    </div>
  );
};

export default SpinnerLoader;
