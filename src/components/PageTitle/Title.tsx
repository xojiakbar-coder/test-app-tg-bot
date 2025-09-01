import React from 'react';

import styles from './Title.module.scss';

const Title = ({ children }: { children: React.ReactNode }) => <div className={styles.title}>{children}</div>;

export default Title;
