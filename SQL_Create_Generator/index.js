const fs = require("fs");
const dockerNames = require('docker-names');
const {randomUUID} = require('node:crypto');

const createStream = fs.createWriteStream("kube_name_random_2k.sql");

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const count = 2000;
for (let i = 0; i < count; i += 1) {
    const name = [];
    name.push(dockerNames.getRandomName());

    name.push(randomUUID().split('-')[0]);

    name.push(Math.floor(1 + Math.random() * (100 - 1)))

    const joinedName = name.join('_');
    createStream.write(`CREATE TABLE ${joinedName} (id SERIAL PRIMARY KEY, test_table_col_a_0 varchar(1), test_table_col_b_0 varchar(5));`);
    createStream.write('\r\n')
}

// Done
createStream.end();
