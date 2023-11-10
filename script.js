const defaultLocation = 'bulacan';

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
    console.log(response)
    displayAll(response);
}

function displayAll(response){
    const sectionTag = document.querySelector('.main-section');
    const insideSection = Array.from(sectionTag.querySelectorAll('*'));
    console.log(insideSection);
    insideSection[1].innerHTML = response.location.name; //h3
    insideSection[3].src = response.current.condition.icon; //img
    insideSection[4].innerHTML = response.current.condition.text; //header paragraph
    insideSection[6].innerHTML = `${response.current.temp_c} °C`; //h2
    insideSection[9].innerHTML = response.current.humidity; // span-humidity
    insideSection[11].innerHTML = response.current.wind_kph; // span-wind
    insideSection[13].innerHTML = response.current.feelslike_c; // span-feelsLike
    insideSection[15].innerHTML = response.current.vis_km; // span-visibility
}

getData();