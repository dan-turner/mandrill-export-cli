import {
  exists as fsExistsCb,
  readFile as fsReadFileCb,
  writeFile as fsWriteFileCb,
  mkdir as fsMkDirCb,
} from "fs";
import { isAbsolute, join } from "path";
import { promisify } from "util";

const fsExists = promisify(fsExistsCb);
const fsReadFile = promisify(fsReadFileCb);
const fsWriteFile = promisify(fsWriteFileCb);
const fsMkDir = promisify(fsMkDirCb);

export const rootDir = join(__dirname, "../../export");

const Encoding = "utf8";

const makeAbsolute = (fileName: string) => {
  if (!isAbsolute(fileName)) {
    fileName = join(rootDir, fileName);
  }
  return fileName;
};

export const exists = (fileName: string): Promise<boolean> =>
  fsExists(makeAbsolute(fileName));

export const readFile = async (fileName: string): Promise<string> => {
  fileName = makeAbsolute(fileName);
  return fsReadFile(fileName, Encoding);
};

export const writeFile = async (
  fileName: string,
  content: string
): Promise<void> => {
  await fsWriteFile(makeAbsolute(fileName), content, Encoding);
};

export const mkDir = async (path: string): Promise<void> => {
  if (!isAbsolute(path)) {
    path = join(rootDir, path);
  }
  await fsMkDir(path, {
    recursive: true,
  });
};
