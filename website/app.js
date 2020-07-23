const base_url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=26c4d53e87fad2351933868f1a2fa748';

async function getApi(zipCode) {
    try {
        const response = await fetch(base_url + zipCode + apiKey);
        const body = await response.json();
        return body.main.temp;
    } catch (error) {
        console.log(error);
    }
}

function postServer(temp, feelings) {
    const d = new Date();
    const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    data = {
        date: newDate,
        temp: temp,
        content: feelings
    };
    fetch('/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


async function getServer() {
    try {
        const response = await fetch('/data');
        const body = await response.json();
        return Promise.resolve(body);
    } catch (error) {
        console.log(error);
    }
}

function updateUI(data) {
    let div1 = document.getElementById('date');
    div1.innerHTML = 'date: ' + data.date;
    let div2 = document.getElementById('temp');
    div2.innerHTML = 'temp: ' + data.temp;
    let div3 = document.getElementById('content');
    div3.innerHTML = 'feelings: ' + data.content;
    document.querySelector('b').classList.add('show');
}

function eventHandeler(event) {
    event.preventDefault();
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getApi(zip).then((result) => {
        postServer(result, feelings);
    }).then((result) => {
        return getServer();
    }).then((result) => {
        updateUI(result);
    });
}

document.getElementById('generate').addEventListener('click', eventHandeler);