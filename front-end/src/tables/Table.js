import React from 'react';
import TableList from './TableList';

/**
* Table Card Component
* @param table
* Table object containing table information
* @returns {JSX.Element}
*/
export default function Table({ tables }) {

    //Seperates table values and sends it to TableList and then returns Table List
    const tablesList = tables.map((table, tableskey) => {
        return (
          <TableList table={table} key={tableskey} />
        )
      });

    return (
        <div>
          {/* Table Column and inside is the TableList Component Information */}

            <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">ID</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col">Reservation ID</th>
              <th scope="col">Finish</th>
            </tr>
          </thead>
          {tablesList}
        </table>
        </div>
    )
}