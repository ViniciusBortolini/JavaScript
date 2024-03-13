
// -----------------------------Declaração das Constantes -----------------------------
const apiKey = "CHAVE DA API";
const apiCountryURL = "https://flagsapi.com";
const continuacao = "";
const cidadeEntrada = document.querySelector("#cidadeEntrada");
const buscar = document.querySelector("#busca");
const cidade = document.querySelector("#cidade");
const temperatura = document.querySelector("#temperatura span");
const descricao = document.querySelector("#descricao");
const iconeTempo = document.querySelector("#iconeTempo");
const pais = document.querySelector("#pais");
const umidade = document.querySelector("#umidade span");
const vento = document.querySelector("#vento span");
const containerTempo = document.querySelector("#informacacoesTempo");

// -----------------------------Funções -----------------------------
/**
 * Consulta os dados meteorológicos de uma cidade através da API do OpenWeatherMap.
 * @param {string} cidade - O nome da cidade para a qual os dados meteorológicos devem ser consultados.
 * @returns {Promise<Object>} - Um objeto contendo os dados meteorológicos da cidade consultada.
 */
const buscarDadosTempo = async (cidade) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data);
    return data
};

/**
 * Exibe os dados do tempo para a cidade especificada.
 * @param {string} nomeCidade - O nome da cidade para o qual os dados do tempo serão exibidos.
 * @returns {void}
 */
const mostrarDadosTempo = async (nomeCidade) => {
    const data = await buscarDadosTempo(nomeCidade);
    cidade.innerText = data.name;
    temperatura.innerHTML = parseInt(data.main.temp)+ "&deg;C";
    descricao.innerText = data.weather[0].description;
    console.log(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    iconeTempo.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
    pais.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    umidade.innerText = `${data.main.humidity}%`;
    vento.innerText = `${data.wind.speed}km/h`;
    containerTempo.classList.remove("hide");
};


// -----------------------------Eventos ---------------------------------------------
buscar.addEventListener("click", (e) => {
    e.preventDefault();
    const cidade = cidadeEntrada.value;
    mostrarDadosTempo(cidade);
});

//Permitir usar o enter do teclado para buscar
cidadeEntrada.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const cidade = e.target.value;
  
      mostrarDadosTempo(cidade);
    }
  });