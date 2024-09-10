import React, { useState, useEffect } from 'react';
import { listTables, readReservation, seatReservation } from "../utils/api";
import { useParams, useHistory } from 'react-router-dom';
import ErrorAlert from "../layout/ErrorAlert";
import "../layout/style.css";

/**
* Sets Reservation to Seat (Select Table Component)
* @returns {JSX.Element}
*/
export default function ReservationSeat() {

    //Sets States
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState(0);

    const [reservation, setReservation] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
    const { reservation_id } = useParams();

    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        listTables(abortController.signal)
            .then(response => {
                setTables(response);
                setTableId(response[0].table_id); // Sets our default value
            })
            .catch(error => console.error(error));

        return () => abortController.abort();
    }, []);


    // Gets Reservation Information
    useEffect(() => {
        async function fetchReservation() {
            const response = await readReservation(reservation_id);
            const fetchedReservation = response.data.data;
            const abortController = new AbortController();

            fetchedReservation.reservation_date = fetchedReservation.reservation_date.slice(0, 10);
            fetchedReservation.reservation_time = fetchedReservation.reservation_time.slice(0, 5);

            setReservation(fetchedReservation, abortController);
            return () => abortController.abort()
        }
        fetchReservation();
    }, [reservation_id]);

    //Maps Tables Info
    const tableOptions = tables.map((table, tablekey) => {
        return (
            <option key={tablekey} value={table.table_id}>{table.table_name} - {table.capacity}{table.occupied ? ' OCCUPIED' : ''}</option>
        )
    });


    const handleChange = (value) => setTableId(value.target.value);

    //Submit Button processes the changes
    const handleSubmit = async (value) => {
        value.preventDefault();
        const abortController = new AbortController();
        const status = await seatReservation(tableId, reservation_id,abortController.signal);

        if (status === 200)
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        else
            setReservationsError(status);
    }

    //Cancel button
    const handleCancel = (value) => {
        value.preventDefault();

        history.goBack();
    }

    return (
        <>
        {/* Select Table Component and Valids that it's possible to assign it */}

            <div className='text-center'>
                <h2 className='rtHead pb-2'>Seat Reservation</h2>
                <p>Choose a table to seat the party</p>
                <form onSubmit={handleSubmit}>
                    <div className=' form-group'>
                        <select
                        className='select-table'
                            name='table_id'
                            onChange={handleChange}
                        >
                            {tableOptions}
                        </select>
                    </div>
                    <button onClick={handleCancel} className='reserveseat-button button mx-3 px-3'>Cancel</button>
                    <button type='submit' className='reserveseat-button button mx-3 px-3'>Submit</button>
                </form>
            </div>
            <ErrorAlert error={reservationsError} />
        </>
    )
}