export const asyncActionType = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
  FAILURE: `${type}_FAILURE`,
  ON: `${type}_ON`,
  OFF: `${type}_OFF`,
  TOGGLE: `${type}_TOGGLE`,
  RESET: `${type}_RESET`,
  SET: `${type}_SET`,
  OPEN: `${type}_OPEN`,
  CLOSE: `${type}_CLOSE`,
  FINISH: `${type}_FINISH`
});


export const getFormattedDate = (dateObject) => {
  const newDate = new Date(dateObject).toDateString().slice(0, -5);
  return newDate;
};

export const getStartTime = (schedule) => {
  const startTimeArray = schedule.map(time => time.start);
  const startTime = startTimeArray.reduce((a, b) => Math.max(a, b));
  return startTime;
};

export const getEndTime = (schedule) => {
  const endTimeArray = schedule.map(time => time.end);
  const endTime = endTimeArray.reduce((a, b) => Math.max(a, b));
  return endTime;
};

export const getPathname = (pathString) => {

  if (pathString === '/') {
    return 'landing page';
  }

  const newString = pathString.split('/');

  if (newString.slice(-1).join() === 'info') {
    return 'event info';
  }

  if (newString.slice(0, 3).join(' ').trim() === 'tickets event') {
    return 'tickets event';
  }
};

export const getInnerText = (html) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.childNodes[0].innerText;
};
