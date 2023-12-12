import {utils,writeFile} from 'xlsx'

export const exportToExcel = (filteredData, columns) => {
  const dataForExport = filteredData.map((row) => {
    const rowData = {};
    columns.forEach((column) => {
      if (typeof column.accessor === 'function') {
        rowData[column.Header] = column.accessor(row);
      } else {
        rowData[column.Header] = row[column.accessor];
      }
    });
    return rowData;
  });

  const ws = utils.json_to_sheet(dataForExport);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet 1');
  writeFile(wb, 'filtered_data.xlsx');
};