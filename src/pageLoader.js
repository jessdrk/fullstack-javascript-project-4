import axios from "axios";
import { cwd } from "process";
import path from "path";
import fs from "fsp";

const generateFileName = (url) => {
  const domain = url.replace(/(^\w+:|^)\/\//, '');
  const sanitizedDomain = domain.replace(/\W+/g, '-');
  const fileName = sanitizedDomain + '.html';

  return fileName;
}

const pageLoader = async (pagepath, saveToDir = cwd) => {
  try {
    const responce = await axios.get(pagepath);
    const html = responce.data;
    const filepath = path.join(saveToDir, generateFileName(pagepath));
    await fs.writeFile(filepath, html);
    return `Page was successfully downloaded into '${filepath}'`;
  } catch (error) {
    return `Error occurred: ${error.message}`;
  }
};

export default pageLoader;