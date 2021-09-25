const el = function selectElement(target, bool) {
  if (!bool) {
    // check whether the target is a nodelist
    return document.querySelectorAll(target).length !== undefined &&
      document.querySelectorAll(target).length > 1
      ? document.querySelectorAll(target)
      : document.querySelector(target);
  } else return document.querySelectorAll(target); // if function has bool parameter use querry selector all
};

el("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const mahasiswa = [
    ...el("textarea")
      .value.replace(/^\s+|\s+$/gm, "")
      .split("\n"),
  ];

  const groupCount = parseInt(el("#groupCount").value);

  renderGroup(group(mahasiswa, groupCount));
  pageToggle();
});

const pageToggle = () => {
  [el(".createGroup"), el(".resultGroup")].forEach((e) =>
    e.classList.toggle("d-none")
  );
};

const renderGroup = (param) => {
  let element = "";
  let string = "";
  for (let i = 0; i < param.length; i++) {
    for (let j = 0; j < param[i].length; j++) {
      string += `
              <p>${param[i][j]}</p>
          `;
    }
    element = `
          <div class="group">
              <h2>Kelompok ${i + 1}</h2>
              ${string}
          </div>
      `;
    el(".hasil").insertAdjacentHTML("beforeend", element);
    string = "";
  }
};
