const fs = require('fs');
const {promisify} = require('util');


promisify(fs.readFile)('data/script.html', 'utf8')
  .then(script => {
    return script.split('\n')
      .map(e => e.replace(/<(?:.|\n)*?>/gm, '').trim())
      .filter(e => !/^\s*$/.test(e))
  })
  .then(d => promisify(fs.writeFile)('data/data.json', JSON.stringify(d), 'utf8'))
  .catch(err => console.log(err));