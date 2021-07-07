import React from 'react'
import { useTable, useSortBy } from 'react-table'
import BTable from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({ columns, data }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    },
        useSortBy
    )
    return (
        <>
        <h1 className="m-3">Table Header</h1>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                +
             </button>
        </div>
        <BTable striped bordered hover size="md" style={{ backgroundColor: 'white', boxShadow: '1px 1px 3px 3px #88888885'}} {...getTableProps() }>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps() }>
                        {headerGroup.headers.map((column, i) => (
                            <th {...column.getHeaderProps([{ className: columns[i].className }, column.getSortByToggleProps()]) }>
                                {column.render('header')}
                                {/* sort direction indicator */}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps() }>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps() }>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </BTable>
        </>
    )
}

export default Table