const db = require('../config/connection');
const { Vet } = require('../models');
const vetSeeds = require('./vetSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Vet', 'vets');

        await Vet.create(vetSeeds);

        console.log('all done!');
        process.exit(0);

    } catch (err) {
        throw err;
    }
});