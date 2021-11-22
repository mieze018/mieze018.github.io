import React from 'react';

interface Props {
  mode?:
    | 'imageOnly'
    | 'imageAndText'
    | 'imageAndTextVertical'
    | 'topBar'
    | 'textOnly';
  style?: {};
}

function Logo(props: Props) {
  function src() {
    if (props.mode === 'imageAndTextVertical') {
      return '/static/logo.txt.svg';
    } else if (props.mode === 'imageAndText') {
      return '/static/logo.header.svg';
    } else {
      return '/static/logo.svg';
    }
  }
  return (
    <img style={{ verticalAlign: 'bottom' }} src={src()} {...props} alt="" />
  );
}

export default Logo;
