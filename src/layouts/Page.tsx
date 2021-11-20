import React, { forwardRef } from 'react';

type DivProps = React.HTMLProps<HTMLDivElement>;

const Page = forwardRef<HTMLDivElement, DivProps>(
  ({ children, title = '', ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

export default Page;
