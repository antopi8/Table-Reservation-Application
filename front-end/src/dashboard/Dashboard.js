import React, { useEffect, useState } from "react";
import {  useHistory,Link } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from '../utils/useQuery';
import ReservationTable from '../reservations/ReservationTable';
import Table from '../tables/Table';
import "../layout/style.css";

//import Clock from '../utils/Clock';

/**
 * Defines the dashboard page.
 * @param currentDate
 *  the current date.
 * @returns {JSX.Element}
 */
function Dashboard({ currentDate }) {
  //States and Queries
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  const query = useQuery();
  const qDate = query.get('date');
  const [date, setDate] = useState(qDate ? qDate : currentDate)

  const history = useHistory();

  //Gets Reservation and Table Info else gives an error
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal)
      .then(setTables)
      .catch(error => console.error(error));

    return () => abortController.abort();
  }


  const handleDateChange = (value) => {
    setDate(value.target.value);
    history.push(`/dashboard?date=${value.target.value}`);
  }


//Formats Date
  const formatDate = (date) => {
    const months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    }

    const month = months[Number(date.slice(5, 7))];
    const day = Number(date.slice(8, 11));
    const year = Number(date.slice(0, 4));

    return `${month} ${day}, ${year}`;
  }

  return (
    <main>
      
      <ErrorAlert error={reservationsError} />

      <h2 className='text-center rtHead'>Reservations:</h2>
      
      <div className='text-center rtHead'>
        {/* Calendar Function in case of very in past or future date*/}
      <input name='date' type='date' className='my-2' value={date} onChange={handleDateChange} />
        <div>
          {/* Buttons < Today >*/}

          <Link to={`/dashboard?date=${previous(date)}`}>
          <button className='navbuttons mx-3 oi oi-chevron-left' onClick={() => setDate(previous(date))}></button>
          </Link>

          <Link to={`/dashboard?date=${today()}`}>
          <button className='navbuttons mx-3 btn btn-sm btn-outline' onClick={() => setDate(currentDate)}>Today</button>
          </Link>

          <Link to={`/dashboard?date=${next(date)}`}>
          <button className='navbuttons mx-3 oi oi-chevron-right' onClick={() => setDate(next(date))}></button>
          </Link>
          
        </div>
        {/* States the Date*/}
        <h5 className='text-center rtHead'>{formatDate(date)}</h5>
      </div>
      {/* Checks Reservations Length (If 0 meaning no items in it) Returns message "no reservations" else returns Reservation Table Component*/}

      { reservations.length === 0 ?
        <div className='text-center'><b>There are no reservations on {formatDate(date)}</b><br /><br /></div>
        :
        <ReservationTable reservations={reservations} key={reservations.reservation_id} />
        }
      {/* Returns Table Component*/}

      <h4 className='text-center rtHead'>Tables</h4>
      <Table tables={tables} key={tables.table_id} />
    </main >

    
  );
}

export default Dashboard;
