import { auto } from "eol";
import mailchip from "@mailchimp/mailchimp_transactional";
import diff from "../utils/diff";
import { exists, mkDir, writeFile } from "../utils/files";

if (!process.env.MANDRILL_APIKEY) {
  console.error(`Please set MANDRILL_APIKEY`);
  process.exit(1);
}

const client = mailchip(process.env.MANDRILL_APIKEY);

const save = async (template: mailchip.TemplateResponse) => {
  const { slug, code, publish_code, ...rest } = template;
  const dirExists = await exists(slug);
  if (!dirExists) {
    await mkDir(slug);
  }
  await writeFile(`${slug}/draft.html`, code ?? "");
  await writeFile(`${slug}/published.html`, publish_code ?? "");
  await writeFile(
    `${slug}/metadata.json`,
    JSON.stringify(rest, Object.keys(rest).sort(), 2)
  );
  if (auto(code ?? "") !== auto(publish_code ?? "")) {
    console.log(`Different: ${slug}`);
    const output = await diff(
      `export/${slug}/draft.html`,
      `export/${slug}/published.html`
    );
    await writeFile(`${slug}/unpublished.diff`, output);
  }
};

const isError = (
  result: mailchip.TemplateResponse[] | Error
): result is Error => {
  return (result as any).isAxiosError;
};

const main = async () => {
  const result = await client.templates.list();
  if (isError(result)) {
    throw result;
  }
  for (const template of result) {
    await save(template);
  }
};

main()
  .then(() => {
    console.log("Done");
  })
  .catch((e) => {
    console.error(e);
  });
