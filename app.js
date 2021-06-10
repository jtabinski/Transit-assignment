// stops api link // 20210610112913
// https://api.winnipegtransit.com/v3/stops/10064.json?api-key=BW4rOzRErQbKDPpVzhq6&street=worthington
// example of data  "stop": {
// "key": 10064,
// "name": "Northbound Osborne at Glasgow",
// "number": 10064,
// "direction": "Northbound",
// "side": "Nearside",
// "street": {
// "key": 2715,
// "name": "Osborne Street",
// "type": "Street"
// },
// my api key BW4rOzRErQbKDPpVzhq6
// streets api link // 20210610113044
// https://api.winnipegtransit.com/v3/streets/2715.json?api-key=BW4rOzRErQbKDPpVzhq6&name=osborne
// example of data "street": {
// "key": 2715,
// "name": "Osborne Street",
// "type": "Street"
// },
// "query-time": "2021-06-10T11:30:43"


const apiKey = 'api-key=BW4rOzRErQbKDPpVzhq6';
const baseUrl = "https://api.winnipegtransit.com/v3/";


const getStreetList = async (ask) => {
  const apiUrl = `${baseUrl}streets.json?${apiKey}&name=${ask}&usage=long`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data.streets;
};

const streetElem = document.querySelector('.streets');
const formElem = document.forms[0];
const schedElem = document.querySelector('tbody');

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  const street = e.target[0].value;
  getStreetList(street).then((streets) => {
    streetElem.innerHTML = '';
    streets.forEach((street) => {
      streetElem.insertAdjacentHTML('beforeend', `
      <a href="#" data-street-key="${
        street.key
      }">${
        street.name
      }</a>`);
    });
  });
});

const getStops = async (streetKey) => {
  const streetUrl = `${baseUrl}stops.json?${apiKey}&street=${streetKey}`;
  const response = await fetch(streetUrl);
  const data = await response.json();

  return data.stops;
}

const getSched = async (stopKey) => {
  const stopUrl = `${baseUrl}stops/${stopKey}/schedule.json?${apiKey}&max-results-per-route=2`;
  const response = await fetch(stopUrl);
  const data = await response.json();

  return data['stop-schedule'];
}
const createNextBus = (scheduleObj) => {

  return {
    street: 'portage avenue',
    crossStreet: 'home Street',
    streetDirection: 'Eastbound',
    busNumber: 21,
    arrTime: '2:00'
  }
}
const schedRowElem = (nextSchedBus) => {
  const {
    street,
    streetDirection,
    crossStreet,
    arrTime,
    busNum
  } = nextSchedBus;
  return `<tr>
  <td>${street}</td>
  <td>${crossStreet}</td>
  <td>${streetDirection}</td>
  <td>${busNum}</td>
  <td>${arrTime}</td>
  </tr>`
};

streetElem.addEventListener('click', (e) => {
  const streetKey = e.target.dataset.streetKey;
  getStops(streetKey).then((stops) => {
    stops.forEach((stop) => {
      getSched(stop.key).then((schedule) => {
        schedule['route-schedules'].forEach(schedStop => {
        schedElem.innerHTML += schedRowElem({
          street: schedule.stop.name,
          crossStreet: schedule.stop['cross-street'].name,
          streetDirection: schedule.stop.direction,
          busNum: 78,
          arrTime: '2021, 16:00 cst'//schedule[`stop-schedule`][`route-schedules`][0][`scheduled-stops`][0][`times`][`arrival`][`estimated`],
         }) 
        })
        
      });

    });
  });
});



// getSched(10783).then((schedule) => {
//   schedule['route-schedules'][0]['scheduled-stops'].forEach((schedStop) => {
//     schedElem.innerHTML += schedRowElem(createNextBus(schedule));

//   });

// });