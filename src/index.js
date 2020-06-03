console.log('%c HI', 'color: firebrick')

function fetchDogs() {
    return fetch('https://dog.ceo/api/breeds/image/random/4')
        .then(resp => resp.json())
        .then(results => {
            results.message.forEach(image => addImage(image))
        });
}

function addImage(dogsURL) {
    let container = document.querySelector('#dog-image-container');
    let newImgElem = document.createElement('img');
    newImgElem.src = dogsURL;
    container.appendChild(newImgElem);
}

function fetchBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(resp => resp.json())
        .then(results => {
            breeds = Object.keys(results.message);
            breeds.forEach(breed => addBreed(breed));
        });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    ul.appendChild(li);
    li.addEventListener('click', changeColor);
}

function changeColor(event) {
    event.target.style.color = 'red';
}

function filterDogsListener() {
    let selector = document.querySelector('breed-dropdown');
    selector.addEventListener('change', event => {
        filterDogs(event.target.value)
    });
}

function filterDogs(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach( breed => addBreed(breed))

}

function findBreedsByLetter (letter) {
    filterDogs(breeds.filter(breed => breed.startsWith(letter)));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchDogs()
    fetchBreeds()
  })