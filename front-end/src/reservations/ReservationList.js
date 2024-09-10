import React from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from '../utils/api';
import "../layout/style.css";

function ReservationList({ reservation }) {

	//Cancel Button on Dashboard to set Reservation to cancelled status
    const handleCancel = async (value) => {
        value.preventDefault();
		const abortController = new AbortController();
        if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')) {
            const status = await cancelReservation(reservation.reservation_id,abortController.signal);
    
            if (status === 200)
                window.location.reload()
        }
    }

	//Formats the time
    const formatTime = (time) => {
        let hour = time[0] + time[1];
        let minutes = time[3] + time[4];
        let meridiem = 'AM';
        if (Number(hour) >= 12) {
            meridiem = 'PM';
            Number(hour) === 12 ? hour = 12 : hour -= 12;
        }
        return `${hour}:${minutes} ${meridiem}`
    }

	
	return (
		<tbody>
			<tr>
				{/* Using the mapped reservations from ReservationTable, the values are assigned out and matches the columns order*/}

				<th scope="row">{reservation.reservation_id}</th>
				<td>{reservation.first_name}</td>
				<td>{reservation.last_name}</td>
				<td>{reservation.mobile_number}</td>
				<td>{reservation.reservation_date.substr(0, 10)}</td>
				<td>{formatTime(reservation.reservation_time)}</td>
				<td>{reservation.people}</td>
				<td data-reservation-id-status={reservation.reservation_id}>
					{reservation.status}
				</td>
				<>
					{reservation.status === "booked" ? (
						<>
							<td>
							{/* The Seat Button which navigates to the table seating */}
								<Link to={`/reservations/${reservation.reservation_id}/seat`}>
									<button className=" resbutton btn btn-sm btn-purple">seat</button>
								</Link>
							</td>

							<td>
								{/* The Edit Button which navigates to the edit reservations */}

								<Link to={`/reservations/${reservation.reservation_id}/edit`}>
									<button
										className="resbutton btn btn-sm btn-outline"
									>
										edit
									</button>
								</Link>
							</td>

							{/* The Cancel Button which changes the reservation status to cancelled */}
							<td>
								<Link to={`/dashboard?date=${reservation.reservation_date}`}>
									<button
										className="resbutton btn btn-sm btn-outline"
										data-reservation-id-cancel={reservation.reservation_id}
										onClick={handleCancel}
									>
										cancel
									</button>
								</Link>
							</td>
						</>
					) : null}
				</>
			</tr>
		</tbody>
	);
}

export default ReservationList;