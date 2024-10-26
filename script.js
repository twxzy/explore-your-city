

// Inicializa o mapa dentro do elemento 'map' e centraliza em uma localização padrão
var map = L.map('map').setView([-23.5489, -46.6388], 10);

// Adiciona os tiles do OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Variável para armazenar a marcação atual
var currentMarker = null;

// Função para buscar a cidade pelo nome e centralizar o mapa
function searchCity() {
    let cityName = document.getElementById('search-box').value;
    if (cityName) {
        var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(cityName);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    map.setView([lat, lon], 12); // Centraliza o mapa na cidade encontrada

                    // Remove a marcação anterior, se existir
                    if (currentMarker) {
                        map.removeLayer(currentMarker);
                    }

                    // Adiciona uma nova marcação no mapa
                    currentMarker = L.marker([lat, lon]).addTo(map)
                        .bindPopup(cityName)
                        .openPopup();
                    
                    //Atualiza o nome da cidade
                    let cityTittle = document.getElementById('city-name')
                    cityTittle.textContent = cityName
                } else {
                    alert('Cidade não encontrada.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar a cidade:', error);
                alert('Erro ao buscar a cidade.');
            });
    } else {
        alert('Por favor, digite o nome da cidade.');
    }
}
