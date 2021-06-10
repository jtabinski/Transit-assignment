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
