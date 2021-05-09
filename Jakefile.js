const { task, desc } = require('jake');
const exec = require('child_process').execSync;
const { join, resolve } = require('path');
const mkdirp = require('mkdirp');
const stripAnsi = require('strip-ansi');

const ejsPath = join(__dirname, 'node_modules', '.bin', 'ejs');
const tmpEjsPath = join(__dirname, 'templates', 'tmp.ejs');
const tmpMdPath = join(__dirname, 'docs', 'tmp.md');
const tmpJsonPath = join(__dirname, '.tmp', 'tmp.json');

desc('Transpile Typescript files');
task('build', () => {
  exec(`npm run build`);
});

desc('Generate data files for use by ejs renderer');
task('ejs-data', ['build'], () => {
  const { writeFileSync } = require('fs');
  const { getHelp } = require(join(__dirname, 'build', 'codespaceCmd', 'help'));

  mkdirp.sync(resolve(tmpJsonPath, '..'));

  writeFileSync(
    tmpJsonPath,
    JSON.stringify({
      codespace: {
        help: stripAnsi(getHelp()).trim(),
      },
    }),
  );
});

desc('Generate tmp.md');
task('ejs', ['ejs-data'], () => {
  exec(`${ejsPath} ${tmpEjsPath} -f ${tmpJsonPath} -o ${tmpMdPath}`);
});
