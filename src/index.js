console.log('%c HI', 'color: firebrick')


document.addEventListener("DOMContentLoaded", () => {
  const $breedFilter = document.querySelector('#breed-dropdown')
  $breedFilter.addEventListener('change', () => { filterBreeds() })

  fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(response => response.json())
    .then(renderImages);

  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(renderBreeds);
})

function renderImages(images) {
  const $dogContainer = document.querySelector('#dog-image-container');
  images.message.forEach(image => {
    const $img = document.createElement('img');
    $img.src = image;
    $dogContainer.append($img);
  });
}


function filterBreeds() {
  const startingLetter = document.querySelector('#breed-dropdown').value
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(result => renderFilteredBreeds(result, startingLetter));
}

function renderBreeds(breeds) {
  const $breedList = document.querySelector('#dog-breeds');
  $breedList.innerHTML = ''
  for (const [breed, types] of Object.entries(breeds.message)) {
    if (types.length) {
      types.forEach(type => {
        const $li = document.createElement('li');
        $li.textContent = `${type} ${breed}`;
        $li.addEventListener('click', () => { $li.style = 'color: red;' })
        $breedList.append($li);
      })
    }
    else {
      const $li = document.createElement('li');
      $li.textContent = `${breed}`;
      $li.addEventListener('click', () => { $li.style = 'color: red;' })
      $breedList.append($li);
    }
  }
}
function renderFilteredBreeds(breeds, firstLetter) {
  const $breedList = document.querySelector('#dog-breeds');
  $breedList.innerHTML = ''
  for (const [breed, types] of Object.entries(breeds.message)) {
    if (breed.charAt(0) == firstLetter) {
      if (types.length) {
        types.forEach(type => {
          const $li = document.createElement('li');
          $li.textContent = `${type} ${breed}`;
          $li.addEventListener('click', () => { $li.style = 'color: red;' })
          $breedList.append($li);
        })
      }
      else {
        const $li = document.createElement('li');
        $li.textContent = `${breed}`;
        $li.addEventListener('click', () => { $li.style = 'color: red;' })
        $breedList.append($li);
      }
    }
  }
}