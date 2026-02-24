import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
  title, 
  description, 
  keywords,
  canonical,
  type = 'website',
  image = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200'
}) => {
  const siteName = 'NB Rents';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || 'Full-service property management in New Brunswick. In-house renovation crew, 24/7 maintenance, and rent maximization. Call (506) 962-RENT(7368).';
  
  return (
    <Helmet
      title={fullTitle}
      meta={[
        { name: 'description', content: metaDescription },
        ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
        { property: 'og:type', content: type },
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: metaDescription },
        { property: 'og:image', content: image },
        { property: 'og:site_name', content: siteName },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: metaDescription },
        { name: 'twitter:image', content: image },
      ]}
      link={canonical ? [{ rel: 'canonical', href: canonical }] : []}
    />
  );
};
