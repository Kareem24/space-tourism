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
const navLink = document.querySelectorAll('.a-link');
const exploreBtn = document.querySelector('.explore-btn');
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.querySelector('.navlinks');
const showNav = () => {
  navLinks.classList.remove('hide-nav');
};
const hideNavbar = () => {
  navLinks.classList.add('hide-nav');
};

hamburger.addEventListener('click', showNav);
closeBtn.addEventListener('click', hideNavbar);
window.addEventListener('scroll', hideNavbar);

const changeActive = (e, activeState, button) => {
  const change = e.currentTarget;

  button.forEach(btn => {
    btn !== change ? btn.classList.remove(activeState) : change.classList.add(activeState);
  });
};
navLink.forEach(btn => btn.addEventListener('click', e => changeActive(e, 'active', navLink)));
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
      const width = window.innerWidth;
      width < 768
        ? (techImg.src = `./starter-code/${images.landscape}`)
        : (techImg.src = `./starter-code/${images.portrait}`);
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
const explore = () => {
  const links = [...navLink];
  if (!links[1].classList.contains('active')) {
    links[1].classList.add('active');
    links[0].classList.remove('active');
  }
};
const changeImgFormat = () => {
  const width = window.innerWidth;
  // width < 700 ? techImg.src = 'now small' : techImg.src = 'image big'
  const src = techImg.src.toString();
  const newstr = src.replace('landscape', 'portrait');
  if (width > 1224) {
    techImg.src = newstr;
  } else {
    const portstr = src.replace('portrait', 'landscape');
    techImg.src = portstr;
  }
};

exploreBtn.addEventListener('click', explore);
window.addEventListener('DOMContentLoaded', getData);
window.addEventListener('resize', changeImgFormat);
window.addEventListener('load', changeImgFormat);
window.addEventListener('load', () => {
  const loader = document.querySelector('.loading-screen');

  loader.classList.add('hide');
});
