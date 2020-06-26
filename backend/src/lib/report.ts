export const transformReportForFrontend = (report: Array<object>, columnName: string, rowName: string, data: string): object => {
    let columnNames = getUniqueRowNames(report, rowName);
    let finalObject = {};
    columnNames.forEach(column => finalObject[column] = (new Object()));
    Object.keys(finalObject).forEach(key => {
        report.forEach(element => {
            if (element[rowName] === key) {
                finalObject[element[rowName]][element[columnName]] = element[data];
            }
        });
    })
    calculateAndAddTotal(finalObject);
    return finalObject;
}

const getUniqueRowNames = (report, rowName): Array<any> => {
    let uniqueRowNames = new Set();
    report.forEach(x => uniqueRowNames.add(x[rowName]));
    return Array.from(uniqueRowNames);
}

export const calculateAndAddTotal = (finalObject: object) => {
    Object.keys(finalObject).forEach(element => {
        let sum = 0;
        Object.values(finalObject[element]).forEach(element2 => {
            sum += +element2;
        })
        finalObject[element]['total'] = sum;
    });
}