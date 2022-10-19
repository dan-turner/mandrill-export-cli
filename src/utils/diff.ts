import { exec } from "child_process";

const diff = async (left: string, right: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    exec(
      `diff --ignore-all-space ${left} ${right}`,
      (error, stdout, stderr) => {
        if (stdout) {
          resolve(stdout);
        } else if (error) {
          reject(error);
        } else if (stderr) {
          reject(stderr);
        }
      }
    );
  });

export default diff;
