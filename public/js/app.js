const Forms = document.querySelectorAll('.form');
const loader = document.querySelector('.load-3')
const Container = document.querySelector('.container');
const Modal = document.querySelector('.modal');
const ChangeLocButton = document.querySelector('.change-location');
const CityName = document.querySelectorAll('.city-name');
const ContryName = document.querySelector('.contry-name');
const Temp = document.querySelector('.temp');
const AirInfo = document.querySelector('.air-info');
const AirImage = document.querySelector('.air-info-img');
const Background = document.querySelectorAll('.DayNight');
const WindSpead = document.querySelector('.wind-spead');
const WindDir = document.querySelector('.wind-dir');
const WindDeg = document.querySelector('.wind-deg');
const Error = document.querySelector('.error');
const InputLoc = document.querySelectorAll('.changeloc');
const Submit = document.querySelectorAll('.submit');
// event lithener
ChangeLocButton.addEventListener('click', () => {
    ShowModal();
});
for (const butt of Submit) {
    butt.addEventListener('click', function () {
        ChangeLoc();
    });
}
for (const form of Forms) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    })
}


// function
function ShowModal() {
    Modal.classList.add('show-modal');
    Modal.addEventListener('click', (e) => {
        if (e.target.tagName == 'I') {
            Modal.classList.remove('show-modal');
        }
    })
}

function GetData(city) {
    Container.style.display = 'none';
    loader.style.display = 'block';
    Error.style.display = 'none';
    fetch(`http://api.weatherapi.com/v1/current.json?key=3569642fe58b4939945183921212812&q=${city}&aqi=no`).then((response) => {
        response.json().then((data) => {
            // loader
            Container.style.display = 'flex';
            loader.style.display = 'none';
            // name of the citys
            for (const Name of CityName) {
                Name.innerHTML = data.location.name;
            }
            document.title = data.location.name;
            // name of the contry
            ContryName.innerHTML = `${data.location.region}/${data.location.country}`;
            //Tempeturte 
            Temp.innerHTML = `${data.current.temp_c} C`;
            // air iofo
            AirInfo.innerHTML = data.current.condition.text
            // day or night
            if (data.current.is_day == 0) {
                for (const elem of Background) {
                    elem.style.background = 'var(--night)';
                }
                AirImage.setAttribute('src', 'public/image/night.png');
            }
            else {
                for (const elem of Background) {
                    elem.style.background = 'var(--day)';
                }
                AirImage.setAttribute('src', 'public/image/day icon.png');
            }
            // wind info
            WindSpead.innerHTML = `${data.current.wind_kph} kmp`;
            WindDir.innerHTML = data.current.wind_dir;
            WindDeg.innerHTML = data.current.wind_degree;
        }).catch(() => {
            Container.style.display = 'none';
            Error.style.display = 'block';
        });
    });
}
GetData('Tehran');

function ChangeLoc() {
    for (const input of InputLoc) {
        if (input.value.trim() !== '') {
            GetData(input.value);
            Modal.classList.remove('show-modal');
        }
        else {
            ShowToast();
        }
        input.value = '';
    }
}
function ShowToast() {

}