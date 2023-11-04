const elements = {
  form: document.querySelector(".js-search-form"),
  list: document.querySelector(".js-list"),
  //buttonHide: document.querySelector(".search-button")
};

/---------------------------------------------------------------/
  
  const arrDay = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П`ятниця",
  "Субота",
];
const namesOfMonth = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const selectors = {
  divGen: document.querySelector(".div-gen"),
  date: document.querySelector(".date"),
  day: document.querySelector(".date-day"),
  month: document.querySelector(".date-month"),
  year: document.querySelector(".date-year"),
  digitalClock: document.querySelector(".digital-clock"),
  seconds: document.querySelector(".clock-seconds__arrow"),
  minutes: document.querySelector(".clock-minutes__arrow"),
  hours: document.querySelector(".clock-hours__arrow"),
  timeOfDay: document.querySelector('.time-of-day')
};

selectors.divGen.style.display = "none";
setInterval(() => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
console.log(month);
  // const hours  = currentDate.getHours();
  // const minutes = currentDate.getMinutes();
  // const seconds = currentDate.getSeconds();

  const localTime = currentDate.toLocaleTimeString("uk-Ua");
  // https://help.sap.com/docs/SAP_BUSINESSOBJECTS_BUSINESS_INTELLIGENCE_PLATFORM/09382741061c40a989fae01e61d54202/46758c5e6e041014910aba7db0e91070.html

  selectors.day.textContent = arrDay[day];
  selectors.month.textContent = namesOfMonth[month];
  selectors.date.textContent = date;
  selectors.year.textContent = year;
  selectors.digitalClock.textContent = `Поточний час ${localTime}`;

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const secondsDeg = (360 / 60) * seconds;
  const minutesDeg = (360 / 60) * minutes;
  const hoursDeg = (360 / 12) * hours + (360 / 12 / 60) * minutes;

  if(hoursDeg > 180){
    selectors.timeOfDay.textContent = 'PM'
  }else{
    selectors.timeOfDay.textContent = 'AM'
  }

  selectors.seconds.style.transform = `rotate(${secondsDeg}deg)`;
  selectors.minutes.style.transform = `rotate(${minutesDeg}deg)`;
  selectors.hours.style.transform = `rotate(${hoursDeg}deg)`;
}, 1000);

  
/---------------------------------------------------------------/  

elements.form.addEventListener("submit", handlerForecast);

function handlerForecast(evt) {
  evt.preventDefault();

  const { city, days } = evt.currentTarget.elements;

  serviceWeather(city.value, days.value)
      .then((data) => elements.list.innerHTML = createMarkup(data.forecast.forecastday))
    
    .catch((err) => console.log(err));
  
  elements.form.style.display = "none"
  selectors.divGen.style.display = "block";
}

function serviceWeather(city, days) {
  const BASE_URL = "https://api.weatherapi.com/v1";
  const API_KEY = "3c06bd2db8074f28997175427232810";
  const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    lang: "uk",
    days,
  });

    return fetch(`${BASE_URL}/forecast.json?${params}`)
    .then((resp) => {
    //console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
console.log(resp.json())
    return resp.json();
  });
}

function createMarkup(arr) {
    console.log(arr)
  return arr
    .map(
      ({date, day: {avgtemp_c, condition: { text, icon },},
      }) => `
    <li class="weather-card">
        <img src="${icon}" alt="${text}" class="weather-icon" />
        <h2 class="date">${date}</h2>
        <h3 class="weather-text">${text}</h3>
        <h3 class="temperature">${avgtemp_c} °C</h3>
    </li>`
    )
    .join("");
}
// *********Links********* \\
// https://www.postman.com/downloads/
// https://rickandmortyapi.com/documentation
// https://www.weatherapi.com/docs/
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

// Приклад документації до API
// https://rickandmortyapi.com/documentation/#rest

// *********Показати роботу з Postman********* \\
// https://www.postman.com/downloads/

// *********Fetch********* \\
// fetch('https://rickandmortyapi.com/api/characte')
// .then(resp => {
//     console.log(resp);
//     return resp.json()
// }).then(data => console.log(data))

// *********Обробка помилок та парсинг відповіді********* \\

// fetch("https://rickandmortyapi.com/api/character")
//   .then((resp) => {
//     console.log(resp);
//     if (!resp.ok) {
//       throw new Error(resp.statusText || "Примисово прокидаємо в catch");
//     }
//     // console.log(resp.json());
//     return resp.json();
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// ***************Практика*************** \\

// Потрібно створити функціонал для отримання прогнозу погоди в місті.
// Використай публічне API https://www.weatherapi.com/docs/
// Використовуй ендпоінт Forecast для того, щоб отримати прогноз погоди на декілька днів.

// Створи форму в яку користувач:
// 1 вводить назву міста.
// 2 обирає на яку кількість днів він хоче отримати прогноз погоди (3, 5 та 7 днів).
// (Іноді параметр не працює в такому випадку можна зробити пошук на 1, 2 та 3 дні)
// Приклад форми https://prnt.sc/kFmLOj6gBdv-

// Після сабміту форми відмалюй картки з інформацією отриманою з бекенду.
// Картка має містити відомості про:
// 1 Зображення з погодою (icon)
// 2 Текст з погодою (text)
// 3 Дату (date)
// 4 Середню температуру в Цельсія (avgtemp_c)
// Приклад картки https://prnt.sc/h_p-A6Hty-i-

// !!! ЗВЕРНИ УВАГУ ЩО API_KEY ПІСЛЯ РЕЄСТРАЦІЇ ВАЛІДНИЙ 21 ДЕНЬ !!!.

// 61069fb8abf74210b7d232148231510

