import type { FC } from 'react';
import type { PageWrapperProps } from '../types';
import styles from './PageWrapper.module.css';

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return <main className={styles.pageWrapper}>{children}</main>;
};
