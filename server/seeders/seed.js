const db = require('../config/connection');
const { Vet, Patient, Client, Prescription } = require('../models');

const vetSeeds = require('./vetSeeds.json');
const patientSeeds = require('./patientSeeds.json');
const clientSeeds = require('./clientSeeds.json');
const prescriptionSeeds = require('./prescriptionSeeds.json');


const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Vet', 'vets');
        await cleanDB('Patient', 'patient');
        await cleanDB('Client', 'client');
        await cleanDB('Prescription', 'prescription');

        await Vet.create(vetSeeds);
        await Patient.create(patientSeeds);
        await Client.create(clientSeeds);
        await Prescription.create(prescriptionSeeds);

        console.log('all done!');
        process.exit(0);

    } catch (err) {
        throw err;
    }
});