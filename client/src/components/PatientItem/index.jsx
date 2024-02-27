import { Link } from "react-router-dom";

function PatientItem(item) {
    const {
        name,
        _id,
        animal_type,
        condition_description
    } = item;

    console.log(item, 'item');

    return (
        <div className='card my-2 mx-2'>
            <Link to={`/patients/${_id}`}>
                <div>
                    <h6> {name} </h6>
                    <p> {animal_type} </p>
                    <p> {condition_description} </p>
                </div>
            </Link>
        </div>
    );
}

export default PatientItem;
