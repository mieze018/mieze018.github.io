import React, { memo } from 'react';
export const Footer = memo(() => {
  //現在の年を取得
  const now = new Date();
  const this_year = now.getFullYear();
  return (
    <footer className="absolute bottom-0 py-0 text-xs text-center">
      © 2009-{this_year} {process.env.REACT_APP_author}
    </footer>
  );
});
