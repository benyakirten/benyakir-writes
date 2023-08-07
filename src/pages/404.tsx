import * as React from 'react';

import { CustomLink } from '@Gen';
import { BigParagraph, LeadHeading } from '@Styles/general-components';

export const Head = () => (
  <>
    <title>Benyakir Writes - 404</title>
    <meta name="description" content="This page wasn't found. Please navigate to another page." />
  </>
);

const NotFoundPage = () => {
  return (
    <>
      <LeadHeading>Page Not Found</LeadHeading>
      <BigParagraph>
        Unfortunately, the page you were looking for doesn't exist. I suggest you find a link that
        better suits you from the left hand side. Or you can just visit the{' '}
        <CustomLink to="/">home page by clicking here</CustomLink>.
      </BigParagraph>
    </>
  );
};

export default NotFoundPage;
