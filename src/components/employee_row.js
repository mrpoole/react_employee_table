import React from 'react';
import '../assets/css/app.scss';


export default props => {
    function formatMoney(number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (
        <tr className="employee-list-row">
            <td>{props.name}</td>
            <td>{props.position}</td>
            <td>{props.office}</td>
            <td>{props.extn}</td>
            <td>{props.start}</td>
            <td>{formatMoney(props.salary)}</td>
            <td>
                <button onClick={() => props.delete(props.id)} className="row-btn btn red darken-2">
                    <i className="material-icons">delete</i>
                </button>
                <button onClick={() => props.get(props.id)} className="row-btn light-green darken-1 btn modal-trigger" data-target="modal"><i className="material-icons">edit</i></button>
            </td>
        </tr>
    );
}