const { task, desc } = require('jake');
const exec = require('child_process').execSync;
const rimraf = require('rimraf');

desc('Transpile Typescript files');
task('tsc', ['clean'], function () {
  exec('tsc -p tsconfig.json');
  //   console.log('This is the default task.');
  //   console.log(
  //     'Jake will run this task if you run `jake` with no task specified.',
  //   );
});

desc('This is some other task. It depends on the default task');
task('clean', function () {
  rimraf.sync('build');
});
