import fs from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createGzip } from 'zlib';
import { Readable } from 'stream';
import {
  SitemapAndIndexStream,
  SitemapStream,
  lineSeparatedURLsToSitemapOptions,
} from 'sitemap';
import { path } from '../paths.js';

const siteMapUrls = JSON.parse(
  fs.readFileSync(`${path}/tennis/atp-sitemap.json`, 'utf8')
);

// writes sitemaps and index out to the destination you provide.
// simpleSitemapAndIndex({
//   // hostname: 'https://www.sportpredictions.net',
//   destinationDir: `${path}/tennis/`,
//   // or (only works with node 10.17 and up)
//   sourceData: siteMapUrls,
// }).then(() => {
//   console.log('finished writing sitemap');
// });

const sms = new SitemapAndIndexStream({
  limit: 50000, // defaults to 45k
  lastmodDateOnly: false, // print date not time
  // SitemapAndIndexStream will call this user provided function every time
  // it needs to create a new sitemap file. You merely need to return a stream
  // for it to write the sitemap urls to and the expected url where that sitemap will be hosted
  getSitemapStream: i => {
    const sitemapStream = new SitemapStream({
      hostname: 'https://www.sportpredictions.net',
    });
    // if your server automatically serves sitemap.xml.gz when requesting sitemap.xml leave this line be
    // otherwise you will need to add .gz here and remove it a couple lines below so that both the index
    // and the actual file have a .gz extension
    const pathTo = `${path}/tennis/sitemap-atp-matches-${i}.xml`;

    const ws = sitemapStream
      // .pipe(createGzip()) // compress the output of the sitemap
      .pipe(createWriteStream(resolve(pathTo))); // write it to sitemap-NUMBER.xml

    return [
      new URL(pathTo, 'https://www.sportpredictions.net/static/').toString(),
      sitemapStream,
      ws,
    ];
  },
});

sms
  // .pipe(createGzip())
  .pipe(createWriteStream(resolve(`${path}/tennis/sitemap-index.xml`)));

Readable.from(siteMapUrls).pipe(sms);
