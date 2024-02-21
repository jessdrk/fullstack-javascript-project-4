import os from "os";
import path from "path";
import nock from 'nock';
import fs from 'fs/promises';
import pageLoader from "../src/pageLoader.js";

nock.disableNetConnect();

let fakepath;
beforeEach(async () => {
  fakepath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
})

test('get connection', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200);

  const testPath = path.join(fakepath, 'ru-hexlet-io-courses.html');
  const result = await pageLoader('https://ru.hexlet.io/courses', fakepath);
  const rightString = `Page was successfully downloaded into '${testPath}'`;
  expect(result).toEqual(rightString);
});