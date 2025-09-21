export const seoConfig = {
  title: 'RPK Portfolio',
  description: 'Modern portfolio website showcasing projects and skills',
  author: 'RPK Developer',
  siteUrl: 'https://rpkdev.com',
  image: '/og-image.jpg',
  twitterHandle: '@rpkdev',
};

export const generatePageTitle = (pageTitle) => {
  return pageTitle ? `${pageTitle} | ${seoConfig.title}` : seoConfig.title;
};

export const generateMetaTags = ({ title, description, image, url }) => {
  return {
    title: generatePageTitle(title),
    description: description || seoConfig.description,
    image: image || seoConfig.image,
    url: url || seoConfig.siteUrl,
  };
};
