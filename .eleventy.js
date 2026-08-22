const pathPrefix = process.env.PATH_PREFIX || '/';

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'src/images': 'images' });

  return {
    pathPrefix,
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site',
      data: '_data'
    },
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};