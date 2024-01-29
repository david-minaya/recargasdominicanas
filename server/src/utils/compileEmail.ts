import path from 'path';
import handleBars from 'handlebars';
import { promises as fs } from 'fs';

export async function compileEmail(templateName: string, context: any) {
  const templatePath = path.join(__dirname, '../emails/', templateName);
  const rawTemplate = await fs.readFile(templatePath, 'utf8');
  const template = handleBars.compile(rawTemplate);
  const htmlEmail = template(context);
  return htmlEmail;
}
