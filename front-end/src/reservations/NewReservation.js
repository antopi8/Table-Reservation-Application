import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from '../utils/api';
import ReservationForm from './ReservationForm';

/**
* New Reservation Form Component
* @returns {JSX.Element}
*/
export default function NewReservation() {

    //useHistory to return to dashboard
    let history = useHistory();

    const [reservationsError, setReservationsError] = useState(null);

    //Submit Button, changes status and sends to custom url based on date else gives error on why form can't submit
    const handleSubmit = async (value, reservation) => {
        value.preventDefault();
        const abortController = new AbortController();
        const status = await createReservation(reservation,abortController.signal);

        if (status === 'booked')
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        else
            setReservationsError(status);
    }

    return (
        <>
            {/* Calls the Reservation Form component and sends the handleSubmit const to it */}

            <h2 className='text-center rtHead pb-2'>Create a New Reservation</h2>
            <ReservationForm handleSubmit={handleSubmit} />
            <ErrorAlert error={reservationsError} />
        </>
    );
}