import React, { memo } from 'react';
const Footer = memo(() => {
  //現在の年を取得
  const now = new Date();
  const this_year = now.getFullYear();
  return (
    <footer className="absolute bottom-0 py-0 text-center text-xs">
      © 2009-{this_year} {process.env.REACT_APP_author}
    </footer>
  );
});

export default Footer;
