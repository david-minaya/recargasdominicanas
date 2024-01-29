const juice = require('juice');
const fs = require('fs');
const path = require('path');

const PROCESS_NAME = '[compile-email-template]';

const [, , inputRelativePath, outputRelativePath] = process.argv;
const inputAbsolutePath = path.resolve(inputRelativePath);
const outputAbsolutePath = path.resolve(outputRelativePath);

function main() {

  console.log(`${PROCESS_NAME} compiling email templates...`);

  createDirIfNotExists(outputAbsolutePath);
  deleteContentDir(outputAbsolutePath);
  compileEmailTemplates();
}

function createDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function deleteContentDir(dirPath) {
    
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    fs.unlinkSync(filePath);
  }
}

function compileEmailTemplates() {
  const files = readFiles(inputAbsolutePath);
  compileFiles(files);
}

function compileFiles(files, position = 0) {
  
  if (position < files.length) {
    
    const file = files[position];
    const juiceOptions = { webResources: { images: false } };
    
    juice.juiceFile(file.path, juiceOptions, (error, html) => {
      const outFilePath = path.join(outputAbsolutePath, file.name);
      fs.writeFileSync(outFilePath, html);
      printCompiledFiles(file.name);
      compileFiles(files, position + 1);  
    });
  }
}

function readFiles(dirPath) {

  const options = { encoding: 'utf8', withFileTypes: true };
  const files = fs.readdirSync(dirPath, options);
  const listFiles = [];

  for (const file of files) {

    if (file.isDirectory()) {

      const nestedPath = path.join(dirPath, file.name);
      listFiles.push(...readFiles(nestedPath));
    
    } else {

      if (/\.(html|hbs)$/.test(file.name)) {
        const name = file.name;
        const filePath = path.join(dirPath, name);
        listFiles.push({ name, path: filePath });
      }
    }
  }

  return listFiles;
}

function printCompiledFiles(fileName) {
  const greenColor = '\x1b[32m%s\x1b[0m'; 
  console.log(greenColor, `${PROCESS_NAME} ${fileName}`);
}

// main();
