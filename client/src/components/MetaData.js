import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

MetaData.defaultProps = {
  title: 'Welcome to RExpress',
  description: 'We sell the best products at a lowest prices.',
  keywords: 'electronics, computers, mobile, accessories, cheap products',
};

export default MetaData;
