const crewPoint = document.querySelector('.desc-text');
const crewBtns = document.querySelectorAll('.dot');
const crewImg = document.getElementById('crew-img');
const getData = async () => {
  const response = await fetch('../starter-code/data.json');
  const data = await response.json();
  const { crew, destinations, technology } = data;
  console.log(destinations);

  // crew[0]
  crewBtns.forEach(crewBtn => {
    crewBtn.addEventListener('click', e => {
      const change = e.currentTarget;
      // console.log(crewBtn.dataset.name);
      crewBtns.forEach(btn => {
        btn !== change ? btn.classList.remove('dot-active') : change.classList.add('dot-active');
      });

      const uniqueCrew = crew.find(crews => crews.name === crewBtn.dataset.name);
      const { name, images, bio, role } = uniqueCrew;
      crewImg.src = `starter-code/${images.png}`;
      crewPoint.innerHTML = `<h4>${role}</h4>
          <h3>${name}</h3>
          <p>
            ${bio}
          </p>`;
    });
  });
};
getData();
