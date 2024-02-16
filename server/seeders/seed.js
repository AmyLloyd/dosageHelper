const db = require('../config/connection');
const { Vet, Patient, Client, Prescription, Drug } = require('../models');

const vetSeeds = require('./vetSeeds.json');
const patientSeeds = require('./patientSeeds.json');
const clientSeeds = require('./clientSeeds.json');
const prescriptionSeeds = require('./prescriptionSeeds.json');
const drugSeeds = require('./drugSeeds.json');


const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Vet', 'vets');
        await cleanDB('Patient', 'patients');
        await cleanDB('Client', 'clients');
        await cleanDB('Prescription', 'prescriptions');
        await cleanDB('Drug', 'drugs');

        await Vet.create(vetSeeds);
        await Patient.create(patientSeeds);
        await Client.create(clientSeeds);
        await Prescription.create(prescriptionSeeds);
        await Drug.create(drugSeeds);

        console.log('all done!');
        process.exit(0);

    } catch (err) {
        throw err;
    }
});