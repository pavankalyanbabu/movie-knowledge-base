const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.join(__dirname, '..', '_site');
const read = (relativePath) => fs.readFileSync(path.join(siteRoot, relativePath), 'utf8');
const exists = (relativePath) => fs.existsSync(path.join(siteRoot, relativePath));

assert.ok(exists('index.html'), 'home page must be generated');
assert.ok(exists('movies/index.html'), 'movie index must be generated');
assert.ok(exists('css/site.css'), 'stylesheet must be copied');
assert.ok(exists('images/reel-atlas.svg'), 'image asset must be copied');
for (const slug of ['the-shawshank-redemption', 'spirited-away', 'mad-max-fury-road']) {
  assert.ok(exists(`movies/${slug}/index.html`), `${slug} page must be generated`);
}

const home = read('index.html');
const index = read('movies/index.html');
assert.match(home, /Reel Atlas/);
assert.match(home, /the-shawshank-redemption/);
assert.match(home, /Browse the atlas/);
assert.match(index, /Spirited Away/);
assert.match(index, /Mad Max: Fury Road/);
assert.match(index, /The Shawshank Redemption/);
assert.match(read('movies/spirited-away/index.html'), /2001/);
assert.match(read('movies/mad-max-fury-road/index.html'), /Action/);
console.log('Site validation passed: pages, assets, navigation, and movie data are present.');