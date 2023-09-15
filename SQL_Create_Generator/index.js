const fs = require("fs");
const dockerNames = require('docker-names');

const count = 2000;

// Make a random int
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate the file name and stream
const createStream = fs.createWriteStream(`kube_name_random_${count}.sql`);

// Loop through and make the name AND write to the file
for (let i = 0; i < count; i += 1) {
    const name = [];
    name.push(dockerNames.getRandomName());
    name.push(Math.floor(1 + Math.random() * (100 - 1)))
    name.push(Math.floor(1 + Math.random() * (100 - 1)))
    const joinedName = name.join('_');
    createStream.write(`CREATE TABLE ${joinedName} (id SERIAL PRIMARY KEY, test_table_col_a_0 varchar(1), test_table_col_b_0 varchar(5));`);
    createStream.write('\r\n')
}

// Done
createStream.end();