let rowOfColumnNames = 11;
let coordinatesOfRowNames = [];
let coordinatesOfColumnNames = [];
let data;
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Sheet 1');
const style = wb.createStyle({
    font: {
        color: '#FF0000',
        size: 10,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
});

export const createExcelReport = (description: string, source: object) => {
data = source;
ws.cell(1, 1).string('Voodoo Park Limited').style(style);
ws.cell(3, 1).string(description).style(style);
ws.cell(11, 1).string('Summary').style(style);
getRowNames();
getColumnNames();
fillInData();
}

export const sendExcelFile = (res: Response) => {
    wb.write('excel.xlsx', res);
}

const fillInData = () => {
    let currentRow = rowOfColumnNames + 2;
    Object.entries(data).forEach(row => {
        for(let i = 0; i < coordinatesOfColumnNames.length; i++){
            if((Object.keys((row)[1])).includes(coordinatesOfColumnNames[i].columnName)){
                ws.cell(currentRow, coordinatesOfColumnNames[i].currentColumn).number(Object.values(row)[1][coordinatesOfColumnNames[i].columnName]).style(style);
            }
        }
        currentRow += 2;
    })
}

const getColumnNames = () => {
    let displayedColumns = [];
    let columnNames = [];
    Object.values(data).forEach(x => {
        columnNames = columnNames.concat(Object.keys(x));
    });
    let uniqueColumnNames = new Set(columnNames);
    uniqueColumnNames.delete('total');
    uniqueColumnNames.forEach(element => {
        displayedColumns.push(element);
    });
    if (columnNames.includes('total')){
        displayedColumns.push('total');
    }
    let currentColumn = 2;
    displayedColumns.forEach(columnName => {
        ws.cell(rowOfColumnNames, currentColumn).string(columnName).style(style);
        coordinatesOfColumnNames.push({ columnName, currentColumn });
        currentColumn++;
    })
}

const getRowNames = () => {
    let currentRow = 13;
    let currentColumn = 1;
    Object.keys(data).forEach(rowName => {
        ws.cell(currentRow, currentColumn).string(rowName).style(style);
        coordinatesOfRowNames.push({ rowName, currentRow });
        currentRow += 2;
    })
}