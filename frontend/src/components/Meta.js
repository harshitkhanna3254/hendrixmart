import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Hendrixmart | Home",
  description: "Remembering Jimi Hendrix",
  keywords:
    "Guitars, buy guitars, Jimi Hendrix, Rock music, 60s guitars, Jimi Hendrix Experiance",
};

export default Meta;
