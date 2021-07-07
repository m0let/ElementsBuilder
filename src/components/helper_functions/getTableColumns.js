export const getTableColumns = (tableColumns = []) => {
    return tableColumns.map((col) => {
        return {
            ...col,
            accessor: col.field
        }
    })
}
