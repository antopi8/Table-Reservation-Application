import React from "react";
import { finishTable } from '../utils/api';
import "../layout/style.css";


function TableList({ table }) {

    //Empties Table for New Guest
    const handleFinish = async (value) => {
        value.preventDefault();
        const abortController = new AbortController();
        if (window.confirm('Is this table ready to seat new guests? This cannot be undone.')) {
            const status = await finishTable(table.table_id, abortController.signal);

            if (status === 200)
                window.location.reload()
        }
    }

    //Finish Button which sets changes of handleFinish
    const finishButton = table.reservation_id ? (
      <button
      className="finishbutton"
        type="button"
        data-table-id-finish={table.table_id}
        data-reservation-id-finish={table.reservation_id}
        onClick={handleFinish}
      >
        done
      </button>
    ) : (
      ""
    );
    
	return (
    <tbody className="text-center">
    {/* Table Contents for Table */}

		<tr key={table.table_id} style={{fontFamily: "Rubik"}}>

            <th scope="row">{table.table_id}</th>

            <td className="text-center">{table.table_name}</td>

             <td className="text-center">{table.capacity}</td>

      {/* Checks if there is a table.reservation_id assigned and sets table status to Occupied or Free based on that */}

            <td data-table-id-status={table.table_id}>
					  <>{table.reservation_id ? "Occupied" : "Free"}</>
				    </td>

      {/* Assigns Reservation ID -If reservation is set to a table that has Reservation ID set to -- */}

            <td className="text-center">
            {table.reservation_id ? table.reservation_id : "--"}
            </td>

      {/*Finish Button based on if the table is occupied and has a reservation ID */}
            <td>{finishButton}</td>
          
    </tr>
    </tbody>
	);
}

export default TableList;