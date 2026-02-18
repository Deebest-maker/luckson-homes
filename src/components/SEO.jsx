import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Luckson Homes - Own a Piece of the Earth",
  description = "Premium real estate development in Abuja, Nigeria. Discover affordable luxury estates in strategic locations including Wuye, Katampe, Karshi, and Sheretti.",
  keywords = "real estate Abuja, property Nigeria, luxury estates Abuja, buy land Abuja, Wuye property, Katampe estate, affordable housing Nigeria",
  image = "/luckson-logo.png",
  url = "https://lucksonhomes.com",
  type = "website",
}) => {
  const siteTitle = "Luckson Homes";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Luckson Homes" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
