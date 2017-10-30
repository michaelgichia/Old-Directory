const nameRegex = /^[a-zA-Z ]*$/;
const phoneNoRegex = /^\d{12}$/;
const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const asyncActionType = (type) => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
})


export const getFormattedDate = (dateObject) => {
  const newDate = new Date(dateObject).toDateString().slice(0, -5);
  return newDate;
}

export const getStartTime = schedule => {
  const startTimeArray = schedule.map(time => time.start);
  const startTime = startTimeArray.reduce((a, b) => Math.max(a, b));
  return startTime;
}

export const getEndTime = schedule => {
  const endTimeArray = schedule.map(time => time.end);
  const endTime = endTimeArray.reduce((a, b) => Math.max(a, b));
  return endTime;
}

export const getPathname = pathString => {

  if (pathString === '/') {
    return "landing page";
  }

  const newString = pathString.split('/');

  if (newString.slice(-1).join() === "info") {
    return "event info"
  }

  if (newString.slice(0, 3).join(" ").trim() === "tickets event") {
    return "tickets event";
  }
}

export const phonenumberValidate = phoneno => phoneNoRegex.test(phoneno);

export const nameValidate = name => nameRegex.test(name);

export const emailValidate = email => emailRegex.test(email);
