
const gulp = require('gulp');
const rsync = require('gulp-rsync');
//布署到正式服
gulp.task('deploy_to_web', function () {
  return gulp.src('dist/**')
    .pipe(rsync({
      root: 'dist',
      username: 'oswap',
      progress: true,
      hostname: 'qa.gamepip.com',
      destination: '/home/oswap/qas_i18n',
      //destination: '../../web_apps/inner_app',
      // exclude: ['*.swp'],
      // chmod: "ugo=rwX",
      incremental: true
    }));
});
//布署到测试服
gulp.task('deploy_to_252', function () {
  return gulp.src('dist/**')
    .pipe(rsync({
      root: 'dist',
      username: 'oswap',
      progress: true,
      hostname: '192.168.0.252',
      destination: '/home/oswap/web_apps/qa_i18n',
      //destination: '../../web_apps/inner_app',
      // exclude: ['*.swp'],
      // chmod: "ugo=rwX",
      incremental: true
    }));
});
