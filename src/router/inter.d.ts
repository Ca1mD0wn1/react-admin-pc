import { ReactNode } from 'react';
export interface IMenuProps {

  label: string;
  key: string;
  icon?: ReactNode;
  children?: IMenuProps[],
  element: ReactNode,
  index?: 1 | 0
}
