document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('input-el');
    const findBtn = document.getElementById('find-btn');

    let defLocation = 'bulacan';


    findBtn.addEventListener('click', () => {
        const inputVal = inputElement.value;
        defLocation = inputVal;
        displayAll(defLocation); 
    });

    async function displayAll(UserLocation){
        const allResponse = await Response(UserLocation);
        console.log(allResponse);
    }


    async function Response (location){
        return new Promise((resolve, reject) => {
            const getResponse = fetch(`http://api.weatherapi.com/v1/current.json?key=a733914831544ebe96e154016230311&q=${location}&aqi=yes`);
            if(getResponse.ok){
                const convert = getResponse.json();
                resolve(convert);
            }
            else{
                reject(errorMessage);
            }

        })
        
    }

    async function displayLocation(allLocation){

    }
    async function displayDegree(allLocation){

    }
    async function displayFells(allLocation){

    }
    async function displayHumidity(allLocation){

    }
    async function displayWind(allLocation){

    }

    displayAll(defLocation);
 
});