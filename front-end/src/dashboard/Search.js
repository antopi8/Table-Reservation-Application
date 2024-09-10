import React, { useState } from 'react';
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from '../reservations/ReservationList';
import ReservationTable from '../reservations/ReservationTable';
import "../layout/style.css";

/**
* Search Form Component
* @returns {JSX.Element}
*/
export default function Search() {
    
    const [mobile_number, setMobileNumber] = useState('');
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    //Get ReservationList Component Information
    const reservationsContent = reservations.map((reservation, reversationkey) => {
        return (
            <ReservationList reservation={reservation} key={reversationkey} />
        )
    });

    //Searches Reservation for mobile number and returns it else states no reservations found message
    const handleChange = (value) => setMobileNumber(value.target.value);

    const handleSearch = (value) => {
        value.preventDefault();

        const abortController = new AbortController();

        listReservations({ mobile_number }, abortController.signal)
            .then(setReservations)
            .then(() => reservationsContent.length === 0 ? setReservationsError({ message: 'No reservations found' }) : setReservationsError(null))
            .catch(setReservationsError);
            return () => abortController.abort();
    }

    return (
        <>
            <h2 className='text-center rtHead pb-2'>Search for Reservation</h2>
            <div className='d-flex flex-column align-items-center'>

                {/* Search Input Field where you enter number then it runs the handleSearch */}

                <form onSubmit={handleSearch} className='mt-3 w-50'>
                    <div className='form-group'>
                        <input name='mobile_number' placeholder="Enter a customer's phone number" onChange={handleChange} className='form-control' required />
                    </div>
                    <button type='submit' className='Finding'>Find</button>
                </form>

                {/* Checks if there is a result and pops up the information else returns error*/}

                {reservationsContent.length !== 0 ? <h3>Reservations</h3> : ""}
                {reservationsContent.length !== 0 ? <ReservationTable reservations={reservations} /> : ""}
                 
                
                {reservationsContent.length === 0 ? (
                    <ErrorAlert error={reservationsError} />
                ) : (
                    ""
                )}
               

            </div>
        </>
    );
}