export function dateFormat (timeValue) {
    let date = new Date(timeValue).toJSON();
    formatedDate = date.replace(/[-:\.]/g, "")
    return formatedDate;
}

