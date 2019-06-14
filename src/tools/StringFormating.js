const minsInDay = 60*24
const minsInHour = 60
export function minutesToHM(timeInMin) {
    let d = Math.floor(timeInMin/(minsInDay))
    let h = Math.floor((timeInMin-(d*minsInDay))/minsInHour)
    let m = timeInMin-(d*minsInDay)-(h*minsInHour)

    return `${(d)?d+"d":""} ${(h)?h+"h":""} ${m}min`
}
export function capitalize(string) 

{

    return string.charAt(0).toUpperCase() + string.slice(1);

}