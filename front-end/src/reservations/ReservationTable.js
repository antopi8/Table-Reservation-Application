import React from 'react';
import ReservationList from './ReservationList';


/**
* Reservation Card Component
* @param reservation
* Reservation object containing reservation information
* @returns {JSX.Element}
*/
export default function Reservation({ reservations }) {
    /**
     * Handles cancellation request
     * @param e 
     */

    /**
    * Formats 24 Hour Time into 12 Hour AM PM Clock
    * @param time
    * 24 hour time, formatted as a string "00:00"
    * @returns String formatted as "12:00 AM"
    */

//Seperates Reservation Values and sends it to ReservationList Component to be used
const reservationList = reservations.map((reservation) => (
  <ReservationList
    key={reservation.reservation_id}
    reservation={reservation}
  />
  ));

    //The Columns for the Reservation Table, it takes data from the ReservationList component
return (
<div>
  <table className="reservations table table-bordered text-center">
        <thead className="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">People</th>
          <th scope="col">Status</th>
          <th scope="col">Seat</th>
          <th scope="col">Edit</th>
          <th scope="col">Cancel</th>
        </tr>
        </thead>
        {reservationList}
      </table>
     </div>
    );
  }