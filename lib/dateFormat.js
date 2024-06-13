export function dateFormat (timeValue) {
    let date = new Date(timeValue).toJSON()
    const formatedDate = date.replace(/[-:\.]/g, "")
    return formatedDate
}

