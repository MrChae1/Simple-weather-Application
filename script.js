document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('input-el');
    const findBtn = document.getElementById('find-btn');
    const ErrMessage = document.querySelector('span');
    const articleEl = document.querySelector('article');
    const allInArticle = Array.from(articleEl.querySelectorAll('*'));
    let defLocation = 'bulacan';


    findBtn.addEventListener('click', () => {
        const inputVal = inputElement.value;
        defLocation = inputVal;
        if(defLocation){
            displayAll(defLocation); 
        }
        else{
            ErrMessage.style.display = 'block';
        } 
    });

    const displayAll = async (UserLocation) => {
        const allResponse = await Response(UserLocation);
        allInArticle[0].innerHTML = `${allResponse.location.name}`;
        allInArticle[1].innerHTML = `${allResponse.current.temp_c} &deg;C`;
        allInArticle[3].innerHTML = `FeelsLike: ${allResponse.current.feelslike_c} &deg;C`;
        allInArticle[4].innerHTML = `Humidity: ${allResponse.current.humidity}%`;
        allInArticle[5].innerHTML = `Wind: ${allResponse.current.wind_kph} km/h`;
        displayErr();
    }
    async function Response (location){
        const getResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=a733914831544ebe96e154016230311&q=${location}&aqi=yes`);
        const convert = await getResponse.json();
        return convert;
    }

    function displayErr(){
        ErrMessage.style.display = 'none';
    }

    // async function displayLocation(allLocation){
    //     const all
    // const allLocation = displayLocation(allResponse);
    //     const allDegree = displayDegree(allResponse);
    //     const allFells = displayFells(allResponse);
    //     const allHumidity = displayHumidity(allResponse);
    //     const allWind = displayWind(allResponse);

    // }
    // async function displayDegree(allLocation){

    // }
    // async function displayFells(allLocation){

    // }
    // async function displayHumidity(allLocation){

    // }
    // async function displayWind(allLocation){

    // }

    displayAll(defLocation);
 
});