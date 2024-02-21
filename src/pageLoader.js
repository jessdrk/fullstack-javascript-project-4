import axios from "axios";
import { cwd } from "process";
import path from "path";
import { writeFile } from "fs/promises";

const generateFileName = (url) => {
  const domain = url.replace(/(^\w+:|^)\/\//, '');
  const sanitizedDomain = domain.replace(/\W+/g, '-');
  const fileName = sanitizedDomain + '.html';

  return fileName;
}

const pageLoader = async (pagepath, directory = cwd()) => {
  try {
    const response = await axios.get(pagepath);
    const html = response.data;
    const filepath = path.join(directory, generateFileName(pagepath));
    await writeFile(filepath, html, 'utf-8');
    return `Page was successfully downloaded into '${filepath}'`;
  } catch (error) {
    console.log(error)
    return `Error occurred: ${error}`;
  }
};

export default pageLoader;