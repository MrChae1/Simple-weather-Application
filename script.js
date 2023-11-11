let defaultLocation = 'bulacan';
let check = false;
const sectionTag = document.querySelector('.main-section');
const elements = Array.from(sectionTag.querySelectorAll('*'));

const InputTag = document.querySelector('.input-nav');
const inputBtn = document.querySelector('.find-btn');
const changeClick = document.querySelector('.Unit-Temp'); 
changeClick.addEventListener('click', () => {
    check = check === false ? true : false;
    getData().then((res) => {
        verifyCheck(res);
    });  
});

inputBtn.addEventListener('click', () => {
    const inputValue = InputTag.value;
    defaultLocation = inputValue;
    displayAll();
});

const getResponse = async (location) => {
    const maxRetries = 3;
    let currentRetry = 0;
    let isLoading = true;

    while (currentRetry < maxRetries) {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a733914831544ebe96e154016230311&q=${location}&days=3&aqi=no&alerts=no`);
            const convert = await response.json();
            isLoading = false; // Set loading to false on successful fetch
            return convert;
        } catch (error) {
            console.error("Error in getResponse:", error);
            currentRetry++;
        }
    }

    // If all retries fail, you might want to handle it here
    console.error("Max retries reached. Unable to fetch data.");
    isLoading = false; // Set loading to false if max retries are reached without success
    return null; // or throw an error, or return a default value
};

const getData = async () => {
    const response = await getResponse(defaultLocation);
        return response;
}

function displayAll() {
    getData().then((res) => {
        elements[3].src = res.current.condition.icon; //img
        elements[1].innerHTML = res.location.name; //h3
        elements[4].innerHTML = res.current.condition.text; //header paragraph
        elements[9].innerHTML = `${res.current.humidity}%`; // span-humidity
        elements[11].innerHTML = `${res.current.wind_kph}km/h`; // span-wind
        elements[15].innerHTML = `${res.current.vis_km}km`; // span-visibility
        verifyCheck(res)
    });
    
}
function verifyCheck(res){
    if(check === true){
        displayAllFahren(res, elements[6], elements[13]);
    }
    else{
        displayAllcelcius(res, elements[6], elements[13]);
    }
}

function displayAllcelcius(response, temp, feels){
    temp.innerHTML = `${response.current.temp_c}°C`; //h2
    feels.innerHTML = `${response.current.feelslike_c}°C`; // span-feelsLike
}
function displayAllFahren(response, temp, feels){
    temp.innerHTML = `${response.current.temp_f}°F`; //h2
    feels.innerHTML = `${response.current.feelslike_f}°F`; // span-feelsLike
}

displayAll();

