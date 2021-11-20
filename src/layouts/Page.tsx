import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

type DivProps = React.HTMLProps<HTMLDivElement>;

const Page = forwardRef<HTMLDivElement, DivProps>(
  ({ children, title = '', ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
