const crewPoint = document.querySelector('.desc-text');
const crewBtns = document.querySelectorAll('.dot');
const crewImg = document.getElementById('crew-img');
const destinationImg = document.getElementById('desstination-img');
const destinationsBtns = document.querySelectorAll('.dest-link');
const getData = async () => {
  const response = await fetch('../starter-code/data.json');
  const data = await response.json();
  const { crew, destinations, technology } = data;
  console.log(destinations);
  function changeActive(e, activeState, button) {
    const change = e.currentTarget;

    button.forEach(btn => {
      btn !== change ? btn.classList.remove(activeState) : change.classList.add(activeState);
    });
  }

  // crew[0]
  crewBtns.forEach(crewBtn => {
    crewBtn.addEventListener('click', e => {
      changeActive(e, 'dot-active', crewBtns);

      const uniqueCrew = crew.find(crews => crews.name === crewBtn.dataset.name);
      const { name, images, bio, role } = uniqueCrew;
      crewImg.src = `starter-code/${images.webp}`;
      crewPoint.innerHTML = `<h4>${role}</h4>
          <h3>${name}</h3>
          <p>
            ${bio}
          </p>`;
    });
  });
  destinationsBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      changeActive(e, 'active', destinationsBtns);
      const uniqueDest = destinations.find(dest => dest.name === btn.dataset.name);
      const { name, images, description, travel, distance } = uniqueDest;
      const destDesc = document.querySelector('.destination-desc');
      const timeDiv = document.querySelector('.estimation');
      destinationImg.src = `starter-code/${images.webp}`;
      destDesc.innerHTML = `<h2>${name}</h2>
        <p>
          ${description}
        </p>`;
      timeDiv.innerHTML = `<div class="distance">
          <p class="nav-text">AVG. DISTANCE</p>
          <h5 class="sub-heading-one kilometer">${distance} </h5>
        </div>
        <div class="time">
          <p class="nav-text">Est. travel time</p>
          <h5 class="sub-heading-one days">${travel}</h5>
        </div>`;
    });
  });
};
window.addEventListener('DOMContentLoaded', getData);
window.addEventListener('load', () => {
  const loader = document.querySelector('.loading-screen');

  loader.classList.add('hide');
});
