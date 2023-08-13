export const formatedDateString = (date:Date): string => {
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = `${date.getFullYear()}`.slice(2);

    return `${day < 10 ? "0"+day : day}/${month < 10 ? "0"+month : month}/${year}`;
}