import { createWriteStream } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

// Define your website's URLs
const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'daily', priority: 0.8 },
    { url: '/video', changefreq: 'daily', priority: 0.7 },
    { url: '/book/1', changefreq: 'daily', priority: 0.7 },
    { url: '/book/2', changefreq: 'daily', priority: 0.7 },
    { url: '/book/3', changefreq: 'daily', priority: 0.7 },
    { url: '/book/4', changefreq: 'daily', priority: 0.7 },
    { url: '/book/5', changefreq: 'daily', priority: 0.7 },
    { url: '/book/6', changefreq: 'daily', priority: 0.7 },
    { url: '/book/7', changefreq: 'daily', priority: 0.7 },
    { url: '/book/8', changefreq: 'daily', priority: 0.7 },
];

// Set hostname for sitemap
const hostname = 'https://paulesabawa.opviha.org';

// Create sitemap stream
const sitemapStream = new SitemapStream({ hostname });

// Write sitemap to a file
const writeStream = createWriteStream('./public/sitemap.xml');

// Pipe the sitemap stream to the file write stream
sitemapStream.pipe(writeStream);

// Add links to the sitemap
links.forEach(link => sitemapStream.write(link));

// End the stream after all links are added
sitemapStream.end();

// Handle completion
streamToPromise(sitemapStream)
    .then(() => console.log('Sitemap generated successfully!'))
    .catch(console.error);
