// Run with `npm test`: checks worker.js redirects www to the apex and serves everything else.
import assert from 'node:assert/strict';
import worker from '../worker.js';

const env = { ASSETS: { fetch: (r) => new Response('asset:' + new URL(r.url).pathname) } };

const www = await worker.fetch(new Request('https://www.slfssf.com/about/?x=1'), env);
assert.equal(www.status, 301);
assert.equal(www.headers.get('location'), 'https://slfssf.com/about/?x=1');

const apex = await worker.fetch(new Request('https://slfssf.com/research/'), env);
assert.equal(apex.status, 200);
assert.equal(await apex.text(), 'asset:/research/');

console.log('worker.js: ok');
