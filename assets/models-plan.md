clientUser
|
--id 
|
--name 
|
--email
|
-- password
|
-- petPatient_id = (petPatient.id) (can be multiple)



Prescription
|
-- id
|
-- date
|
-- drug_name
|
-- drug-strength
|
-- dosage
|
-- instructions
|
-- quantity
|
--course_length
|
-- type
|
-- prescriber_id = vetUser.id (only one)
|
-- administration_id = administration.id



VetUser
|
-- id
|
-- name
| 
-- email
|
-- password
|
-- client_id = (ClientUser.id)
|
-- patient.id = (petPatient.id)



petPatient
|
-- id
|
-- type
|
-- condition_description
|
-- prescription_id = (prescription.id)

