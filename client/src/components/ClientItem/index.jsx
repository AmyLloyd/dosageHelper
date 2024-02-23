import { Link } from "react-router-dom";

function ClientItem(item) {
    const {
        username,
        _id,
        email
    } = item;

    console.log(item, 'item');

    return (
        <div className="card px-1 py-1">
            <Link to={`/clients/${_id}`}>
                <button>
                    <h6> {username} </h6>
                    <p> {email} </p>
                </button>
            </Link>
        </div>
    );
}

export default ClientItem;
