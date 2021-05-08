const { task, desc } = require('jake');
const exec = require('child_process').execSync;
const rimraf = require('rimraf');
const { join, resolve } = require('path');
const mkdirp = require('mkdirp');
const stripAnsi = require('strip-ansi');

const tscPath = join(__dirname, 'node_modules', '.bin', 'tsc');
const ejsPath = join(__dirname, 'node_modules', '.bin', 'ejs');
const tmpEjsPath = join(__dirname, 'templates', 'tmp.ejs');
const tmpMdPath = join(__dirname, 'docs', 'tmp.md');
const tmpJsonPath = join(__dirname, '.tmp', 'tmp.json');

desc('Transpile Typescript files');
task('tsc', ['clean-tsc'], () => {
  exec(`${tscPath} -p tsconfig.json`);
});

desc('Delete generated files');
task('clean-tsc', () => {
  rimraf.sync('build');
  //   rimraf.sync(join(__dirname, 'docs', 'tmp.md'));
});

desc('Generate data files for use by ejs renderer');
task('ejs-data', ['tsc'], () => {
  const { writeFileSync } = require('fs');
  const { getHelp } = require(join(__dirname, 'build', 'cmds', 'codespace'));

  mkdirp.sync(resolve(tmpJsonPath, '..'));

  writeFileSync(
    tmpJsonPath,
    JSON.stringify({
      codespace: {
        help: stripAnsi(getHelp()),
      },
    }),
  );
});

desc('Generate tmp.md');
task('ejs-run', ['ejs-data'], () => {
  //   console.log('TODO... generate tmp.md');
  //   ejs ./template_file.ejs -f data_file.json -o ./output.html
  exec(`${ejsPath} ${tmpEjsPath} -f ${tmpJsonPath} -o ${tmpMdPath}`);
});

// task('ejs:data', ['ejs:data'] () => {
//   exec(`${join(__dirname, 'node_modules', '.bin', 'ejs')} -p tsconfig.json`);
// });

// desc('Generate files from ejs templates');
// task('ejs:run', ['ejs:data'] () => {
//   exec(`${join(__dirname, 'node_modules', '.bin', 'ejs')} -p tsconfig.json`);
// });
