document.getElementById('searchInput').focus();

function Character(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.birthYear = birthYear;
    this.gender = gender;
}

document.getElementById('searchInputForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const inputValue = document.getElementById('searchInput').value;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://swapi.co/api/people/?search=' + inputValue);

    xhr.addEventListener('load', function () {
        if (this.status === 200) {
            let output = '';

            const dataList = this.response.results;
            dataList.forEach(listItem => {
                const character = new Character(listItem.name, listItem.height, listItem.mass, listItem.hair_color, listItem.skin_color, listItem.eye_color, listItem.birth_year, listItem.gender);

                output += `<div class="col-md-6 mb-3">
                                <div class="card bg-warning text-uppercase font-weight-bold">
                                    <div class="card-header py-3">Name: ${character.name}</div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Height: ${character.height}</li>
                                        <li class="list-group-item">Mass: ${character.mass}</li>
                                        <li class="list-group-item">Hair color: ${character.hairColor}</li>
                                        <li class="list-group-item">Skin color: ${character.skinColor}</li>
                                        <li class="list-group-item">Eye color: ${character.eyeColor}</li>
                                        <li class="list-group-item">Birth year: ${character.birthYear}</li>
                                        <li class="list-group-item">Gender: ${character.gender}</li>
                                    </ul>
                                </div>
                            </div>`;
                document.querySelector('.col-lg-8 .row').innerHTML = output;
            });
        } else {
            console.log('The connection ended with status ' + this.statusText);
        }
    });

    xhr.addEventListener('error', function () {
        alert('Something went wrong!');
    });

    xhr.send();

    document.getElementById('searchInput').value = '';
});