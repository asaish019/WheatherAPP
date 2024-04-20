const target = 'Mumbai'

async function fetchLocation(target) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=2a9b08dcd88f4fcc869181241240704&q=${target}&aqi=yes`
        const response = await fetch(url)
        const data = await response.json();
        console.log(data)
        console.log("data fetched")
        const currentTemp = data.current.temp_c;
        const location = data.location.name;
        const icon = data.current.condition.icon;
        const condition = data.current.condition.text;
        const lastupdate = data.current.last_updated;
        const localTime = data.location.localtime;

        updateDOM(currentTemp, location, localTime, icon, condition, lastupdate)
        console.log(currentTemp, localTime, location, icon, lastupdate)
    }
    catch (error) {
        console.log(error)
    }
}

//fetchLocation(target)

const form = document.querySelector("form")
const Searchloc = document.querySelector('.searchField');
const temp = document.querySelector(".temp")
const city = document.querySelector(".Location h1")
const time = document.querySelector(".Location span")
const conditiontxt = document.querySelector(".condition span")
const conditionicon = document.querySelector(".condition img")
const lastupdated = document.querySelector("h6")
const faicon = document.querySelector('.fa-refresh')
const dateField = document.querySelector('.day')

form.addEventListener('submit', search)

function search(e) {
    e.preventDefault();
    const target = Searchloc.value;
    fetchLocation(target)
}

function updateDOM(currentTemp, location, localTime, icon, condition, lastupdate) {
    temp.innerHTML = `${currentTemp}&deg;C`;
    conditionicon.src = icon;
    conditiontxt.innerText = condition;
    city.innerText = location;
    time.innerText = localTime;
    lastupdated.innerText = "Last updated: " + lastupdate;

    const exacTime = localTime.split(" ")[1]
    const exactdate = localTime.split(" ")[0]
    const exactday = days(new Date(exactdate).getDay())


    dateField.innerText = `${exacTime} ${exactday} ${exactdate}`

}
function days(day) {
    switch (day) {
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return "Friday"
        case 6: return "Saturday"
    }

}