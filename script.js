import { getResponse, getResponse } from "./api";
let defaultLocation = 'bulacan';
let check = false;
const mainTag = document.querySelector('.document-main');
const sectionTag = mainTag.querySelector('.main-section');
const modalTag = mainTag.querySelector('.mainModal');
const elements = Array.from(sectionTag.querySelectorAll('*'));
const asideTag = mainTag.querySelector('.main-aside');
const AllHour = Array.from(document.querySelectorAll('.hour-desc'));
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



const getData = async () => {
    const response = await getResponse(defaultLocation, isLoading);
    return response;
}

function displayAll() {
    loadingResponse();
    getData().then((res) => {
        elements[3].src = res.current.condition.icon; //img
        elements[1].innerHTML = res.location.name; //h3
        elements[4].innerHTML = res.current.condition.text; //header paragraph
        elements[9].innerHTML = `${res.current.humidity}%`; // span-humidity
        elements[11].innerHTML = `${res.current.wind_kph}km/h`; // span-wind
        elements[15].innerHTML = `${res.current.vis_km}km`; // span-visibility
        verifyCheck(res)
        allImages(res);
        console.log(res);
    });    
}

function allImages(res){
    for(let i = 0; i < AllHour.length; i++){
        AllHour[i].children[0].src = `${res.forecast.forecastday[0].hour[i].condition.icon}`;
        AllHour[i].children[1].innerHTML = `${res.forecast.forecastday[0].hour[i].condition.text}`;
    }
}

function allPTempCel(res){
    for(let i = 0; i < AllHour.length; i++){
        AllHour[i].children[2].innerHTML = `${res.forecast.forecastday[0].hour[i].temp_c}°C`
    }
}
function allPTempFah(res){
    for(let i = 0; i < AllHour.length; i++){
        AllHour[i].children[2].innerHTML = `${res.forecast.forecastday[0].hour[i].temp_c}°F`
    }
}

function verifyCheck(res){
    if(check === true){
        displayAllFahren(res, elements[6], elements[13]);
        allPTempFah(res);
    }
    else{
        displayAllcelcius(res, elements[6], elements[13]);
        allPTempCel(res);
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

function displayHidden(){
    asideTag.style.visibility = 'hidden';
    sectionTag.style.visibility = 'hidden';
    modalTag.style.visibility = 'visible';

}

function displayMain(){
    asideTag.style.visibility = 'visible';
    sectionTag.style.visibility = 'visible';
    modalTag.style.visibility = 'hidden';
}

function notFetch(){
    const modalParah = modalTag.querySelector('p');
    modalParah.innerHTML = `Sorry!!! Something Not Rigth Check Your Input or Reload The Page Thank You.`;
}

displayAll();

