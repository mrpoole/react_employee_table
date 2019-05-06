import React from 'react';

export default props => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.position}</td>
            <td>{props.office}</td>
            <td>{props.extn}</td>
            <td>{props.start}</td>
            <td>{props.salary}</td>
            <td>
                <button onClick={() => props.delete(props.id)} className="btn btn-floating red darken-2 waves-effect waves-light">
                    <i className="material-icons">delete</i>
                </button>
                <button onClick={() => props.edit(props.id)} className="waves-effect waves-light btn modal-trigger" data-target="modal1"><i className="material-icons">edit</i></button>
            </td>
        </tr>
    );
}