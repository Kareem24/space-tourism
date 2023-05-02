const crewPoint = document.querySelector('.desc-text');
const crewBtns = document.querySelectorAll('.dot');
const crewImg = document.getElementById('crew-img');
const destinationImg = document.getElementById('desstination-img');
const destinationsBtns = document.querySelectorAll('.dest-link');
const destDesc = document.querySelector('.destination-desc');
const timeDiv = document.querySelector('.estimation');
const techImg = document.getElementById('tech_img');
const techDescription = document.querySelector('.tech-desc');
const techBtns = document.querySelectorAll('.number-btn ');
const navLinks = document.querySelectorAll('.a-link');
const exploreBtn = document.querySelector('.explore-btn');
const links = [...navLinks];

const changeActive = (e, activeState, button) => {
  const change = e.currentTarget;

  button.forEach(btn => {
    btn !== change ? btn.classList.remove(activeState) : change.classList.add(activeState);
  });
};
navLinks.forEach(btn => btn.addEventListener('click', e => changeActive(e, 'active', navLinks)));
const getItem = (obj, name) => obj.find(item => item.name === name);

const loadDestination = (e, destinationData, uniqueBtn) => {
  const destName = uniqueBtn.dataset.name;
  const destination = getItem(destinationData, destName);
  const { name, images, description, travel, distance } = destination;

  destinationImg.src = `starter-code/${images.webp}`;
  destDesc.innerHTML = `<h2>${name}</h2>
        <p>${description}</p>`;

  timeDiv.innerHTML = `<div class="distance">
          <p class="nav-text">AVG. DISTANCE</p>
          <h5 class="sub-heading-one kilometer">${distance} </h5>
        </div>
        <div class="time">
          <p class="nav-text">Est. travel time</p>
          <h5 class="sub-heading-one days">${travel}</h5>
        </div>`;

  changeActive(e, 'active', destinationsBtns);
};

const getDestination = destinations => {
  destinationsBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      loadDestination(e, destinations, btn);
    });
  });
};

const getCrew = crews => {
  crewBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      changeActive(e, 'dot-active', crewBtns);
      const crewName = btn.dataset.name;
      const uniqueCrew = getItem(crews, crewName);
      // const uniqueCrew = crew.find(crews => crews.name === crewBtn.dataset.name);
      const { name, images, bio, role } = uniqueCrew;
      crewImg.src = `starter-code/${images.webp}`;
      crewPoint.innerHTML = `<h4>${role}</h4>
          <h3>${name}</h3>
          <p>${bio}</p>`;
    });
  });
};
const getTechnology = tech => {
  techBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      changeActive(e, 'active-num', techBtns);
      const techName = btn.dataset.name;
      const uniqueTech = getItem(tech, techName);
      const { name, images, description } = uniqueTech;
      techImg.src = `./starter-code/${images.landscape}`;
      techDescription.innerHTML = `
      <p class="nav-text">THE TERMINOLOGY…</p>
          <h3>${name}</h3>
          <p>
            ${description}
          </p>
      `;
    });
  });
};

const getData = async () => {
  const response = await fetch('../starter-code/data.json');
  const data = await response.json();
  const { crew, destinations, technology } = data;
  getDestination(destinations);
  getCrew(crew);
  getTechnology(technology);
};
exploreBtn.addEventListener('click', () => {
  if (!links[1].classList.contains('active')) {
    links[1].classList.add('active');
    links[0].classList.remove('active');
  }
});
window.addEventListener('DOMContentLoaded', getData);
window.addEventListener('load', () => {
  const loader = document.querySelector('.loading-screen');

  loader.classList.add('hide');
});
