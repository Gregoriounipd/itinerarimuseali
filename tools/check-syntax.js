try {
  require('../pages/reperto/[slug].js');
  console.log('OK: no syntax errors when requiring the file.');
} catch (err) {
  console.error('Syntax/Error while requiring file:\n', err);
  process.exit(1);
}
