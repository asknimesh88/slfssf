export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets', 'src/robots.txt': 'robots.txt' });

  eleventyConfig.addGlobalData('buildYear', new Date().getFullYear());
  eleventyConfig.addFilter('take', (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter('uniqueBy', (arr, key) => [...new Set(arr.map((x) => x[key]))]);
  eleventyConfig.addFilter('longDate', (d) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
  eleventyConfig.addFilter('sortByDate', (arr) => [...arr].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)));

  return {
    dir: { input: 'src', output: 'dist' },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
  };
}
