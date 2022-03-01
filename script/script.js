document.querySelector("#searchForm").addEventListener('submit', async (e) => {
  e.preventDefault();

  let search = document.querySelector("#searchText").value;

  if (search !== "") {
    clearInfo ();
    error ("Carregando");
    
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=434ffbe7702659b46019c22e25ee8e90`);
    let json = await result.json();
    clearInput ();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        feelsLike: json.main.feels_like,
        maxTemp: json.main.temp_max,
        minTemp: json.main.temp_min,
        humidity: json.main.humidity,
        weather: json.weather[0]['main']

      });
    } else {
      clearInfo ();
      error ('Cidade não encontrada!');
    }
  }  else {
    clearInfo ();
  } 
})

function clearInput () {
  document.querySelector('#searchText').value = '';
}

function showInfo (json) {
  error ('');

  document.querySelector('#city').innerHTML = `Cidade: ${json.name}`;
  document.querySelector('#country').innerHTML = `País: ${json.country}`;
  document.querySelector('#temp').innerHTML = `Temperatura: ${(json.temp - 273.15).toFixed(1)} °C`;
  document.querySelector('#maxTemp').innerHTML = `Temperatura Máxima: ${(json.maxTemp - 273.15).toFixed(1)} °C`;
  document.querySelector('#minTemp').innerHTML = `Temperatura Mínima: ${(json.minTemp - 273.15).toFixed(1)} °C`;
  document.querySelector('#humidity').innerHTML = `Umidade: ${json.humidity} %`;
  document.querySelector('#feelsLike').innerHTML = `Sensação Térmica: ${(json.feelsLike - 273.15).toFixed(1)} °C`;
  document.querySelector('.dataReturn').style.display = 'block';
  console.log(`${json.weather}`)
}

function clearInfo () {
  error ('');
  document.querySelector('.dataReturn').style.display = 'none';
}

function error (message) {
  document.querySelector('#errorMsg').innerHTML = message;
}
