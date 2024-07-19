function searchArtist() {
    var searchTerm = document.getElementById("searchInput").value;

    // Sua chave de consumidor gerada
    var apiKey = 'NqKoN3CxEslnFGFEqSUYa9plGgF5jHRy';

    var apiUrl = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(searchTerm)}&fmt=json&limit=1&client=${apiKey}`;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayArtistDetails(data.artists[0]);
        })
        .catch(function(error) {
            console.log("Erro ao buscar informações do artista:", error);
        });
}

function displayArtistDetails(artist) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (artist) {
        var artistName = artist.name;
        var artistId = artist.id;
        var artistCountry = artist.country;
        var artistType = artist.type;

        var artistDetails = document.createElement("div");
        artistDetails.innerHTML = `
            <br/>
            <h2>Detalhes do Artista</h2>
            <p><strong>Nome:</strong> ${artistName}</p>
            <p><strong>País:</strong> ${artistCountry}</p>
        `;
        if (artistType == 'Person'){
            var artistType1 = document.createElement("div");
            artistType1.innerHTML = '<p><strong>Tipo:</strong> Cantor(a) solo</p>';
        }
        else {
            var artistType1 = document.createElement("div");
            artistType1.innerHTML = '<p><strong>Tipo:</strong> Grupo musical / Banda</p>';
        }
        var artistLink = document.createElement("a");
        artistLink.href = `https://musicbrainz.org/artist/${artistId}`;
        artistLink.textContent = 'Mais Informações do Artista';

        resultsDiv.appendChild(artistDetails);
        resultsDiv.appendChild(artistType1);
        resultsDiv.appendChild(artistLink);
    } else {
        var artistError = document.createElement("p");
        resultsDiv.textContent = "Nenhum resultado encontrado.";
    }
}

function limparInput() {
    // Obtém o elemento de input pelo ID
    var inputElement = document.getElementById("searchInput");
  
    // Define o valor do input como vazio
    inputElement.value = "";
  }



