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