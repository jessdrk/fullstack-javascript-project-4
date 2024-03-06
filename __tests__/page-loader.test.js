import os from 'os';
import path from 'path';
import nock from 'nock';
import fs from 'fs/promises';
import pageLoader from '../src/pageLoader.js';
import htmlResult from '../__fixtures__/htmlResult.js';

nock.disableNetConnect();

let fakepath;
let testPath;
beforeEach(async () => {
  fakepath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

afterEach(async () => {
  await fs.rm(fakepath, { recursive: true, force: true });
});

test('Check the path', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200);

  testPath = path.join(fakepath, 'ru-hexlet-io-courses.html');
  const result = await pageLoader('https://ru.hexlet.io/courses', fakepath);
  const rightString = `Page was successfully downloaded into '${testPath}'`;
  expect(result).toEqual(rightString);
});

test('Check the data of file', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, htmlResult);

  testPath = path.join(fakepath, 'ru-hexlet-io-courses.html');
  await pageLoader('https://ru.hexlet.io/courses', fakepath);
  const dataOfFakeFile = await fs.readFile(testPath, 'utf-8');
  expect(dataOfFakeFile).toEqual(htmlResult);
});
