import React, { ReactNode } from 'react';
import { TitleBar } from '../features';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
    <>
      <TitleBar />
      {children}
    </>
  );
}
