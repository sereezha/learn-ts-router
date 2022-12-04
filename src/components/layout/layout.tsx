import React from "react";
import styles from './layout.module.scss'

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className={styles.layout}>{children}</div>
);

export default Layout;
