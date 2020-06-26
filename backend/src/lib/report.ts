export const transformReportForFrontend = (report: Array<object>, columnName: string, rowName: string, data: string): object => {
    let rowNames = getUniqueRowNames(report, rowName);
    let finalObject = {};
    rowNames.forEach(row => finalObject[row] = (new Object()));
    Object.keys(finalObject).forEach(key => {
        report.forEach(individualResult => {
            if (individualResult[rowName] === key) {
                finalObject[individualResult[rowName]][individualResult[columnName]] = individualResult[data];
            }
        });
    })
    calculateAndAddTotal(finalObject);
    return finalObject;
}

const getUniqueRowNames = (report, rowName): Array<any> => {
    let uniqueRowNames = new Set();
    report.forEach(individualResult => {
        uniqueRowNames.add(individualResult[rowName])
    });
    return Array.from(uniqueRowNames);
}

export const calculateAndAddTotal = (finalObject: object) => {
    Object.keys(finalObject).forEach(row => {
        let sum = 0;
        Object.values(finalObject[row]).forEach(numberToAdd => {
            sum += +numberToAdd;
        })
        finalObject[row]['total'] = sum;
    });
}