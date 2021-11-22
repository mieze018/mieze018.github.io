import React from 'react';

function Copyright() {
  return (
    <div>
      Copyright © {new Date().getFullYear()}
      <a color="primary" href="https://everbank.co.jp/" target="_blank">
        EverBank
      </a>{' '}
      All rights reserved.{' '}
    </div>
  );
}

export default function Footer() {
  return (
    <div>
      <Copyright />
    </div>
  );
}
