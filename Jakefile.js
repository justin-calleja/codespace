const { task, desc } = require('jake');
const exec = require('child_process').execSync;
const { join, resolve } = require('path');
const mkdirp = require('mkdirp');
const stripAnsi = require('strip-ansi');

const ejsPath = join(__dirname, 'node_modules', '.bin', 'ejs');
const tmpEjsPath = join(__dirname, 'templates', 'help-output.ejs');
const tmpMdPath = join(__dirname, 'docs', 'help-output.md');
const tmpJsonPath = join(__dirname, '.tmp', 'help-output.json');

desc('Transpile Typescript files');
task('build', () => {
  exec(`npm run build`);
});

desc('Generate data files for use by ejs renderer');
task('ejs-data', ['build'], () => {
  const { writeFileSync } = require('fs');
  const { getHelp: codespaceCmdGetHelp } = require(join(
    __dirname,
    'build',
    'codespaceCmd',
    'help',
  ));
  const { getHelp: codespaceNewCmdGetHelp } = require(join(
    __dirname,
    'build',
    'codespaceCmd',
    'newCmd',
    'help',
  ));
  const { getHelp: codespaceAddCmdGetHelp } = require(join(
    __dirname,
    'build',
    'codespaceCmd',
    'addCmd',
    'help',
  ));

  mkdirp.sync(resolve(tmpJsonPath, '..'));

  writeFileSync(
    tmpJsonPath,
    JSON.stringify(
      {
        codespaceCmd: {
          help: stripAnsi(codespaceCmdGetHelp()).trim(),
        },
        codespaceNewCmd: {
          help: stripAnsi(codespaceNewCmdGetHelp()).trim(),
        },
        codespaceAddCmd: {
          help: stripAnsi(codespaceAddCmdGetHelp()).trim(),
        },
      },
      null,
      2,
    ),
  );
});

desc('Generate md file');
task('ejs', ['ejs-data'], () => {
  exec(`${ejsPath} ${tmpEjsPath} -f ${tmpJsonPath} -o ${tmpMdPath}`);
});
