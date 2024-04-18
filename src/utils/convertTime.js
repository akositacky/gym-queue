import moment from "moment/moment";

export const convertDate = (time, minutes) => {
    //time should be server timestamp seconds only
    // let dateInMillis = time * 1000
    // let date = new Date(dateInMillis)
    // let myDate = date.toLocaleDateString()
    // let myTime = date.toLocaleTimeString()
    // myDate = myDate.replaceAll('/', '-')
    // return myDate + " " + myTime

    const date = new Date();
    const plusOne = minutes + 1;

    const convertedDate = new Date(date.setTime(time.valueOf() - 60000));
    const newDateObj = moment(convertedDate).add(plusOne, 'm').toDate();
    return newDateObj
}

export const fiveMins = () => {

    const date = new Date();
    // const convertedDate = new Date(date.setTime(time.valueOf() - 60000));
    const newDateObj = moment(date).add(10, 's').toDate();
    return newDateObj
}