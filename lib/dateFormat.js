export function dateFormat (timeValue) {

    let date = new Date(`${timeValue}`)
    date = date.toJSON()
    date = date.replace(/-/g,'')
    date = date.replace(/:/g,'')
    date = date.replace(".","")

    return date

}

