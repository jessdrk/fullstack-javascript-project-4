import os from "os";
import path from "path";
import exampleOfHtmlFile from '../__fixtures__/exampleOfHtmlFile.html';

const newdir = os.tmpdir();
const newPath = path.join(newdir, 'ru-hexlet-io-courses.html');

nock.disableNetConnect();

beforeEach(async () => {
  await fs.mkdtemp(path.join(newdir, 'page-loader-'));
})

test('get connection', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200);

  const fullpath = await pageLoader('https://ru.hexlet.io/courses', newdir);
  expect(fullpath).toEqual(newPath);
});