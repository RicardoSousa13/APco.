fetch("data/projects.json")
  .then((res) => res.json())
  .then((projects) => {
    const container = document.querySelector(".hdrLWF");
    const years = new Set();
    const types = new Set();
    const locations = new Set();
    const collaborations = new Set();

    projects.forEach((project) => {
      const details = document.createElement("details");
      details.className = "project";
      details.setAttribute("data-year", project.year);
      details.setAttribute("data-type", project.type.toLowerCase());
      details.setAttribute("data-location", project.location.toLowerCase());
      details.setAttribute(
        "data-collaboration",
        project.collaboration.toLowerCase()
      );

      const summary = `
        <summary class="sections archive-grid">
          <div class="title">${project.title}</div>
          <div class="collaboration">${project.collaboration}</div>
          <div class="location">${project.location}</div>
          <div class="type">${project.type}</div>
          <div class="year">${project.year}</div>
        </summary>
      `;

      let content = "";
      if (project.image || project.description) {
        content = `<div class="project-content">`;
        if (project.description) content += `<p>${project.description}</p>`;
        if (project.image)
          content += `<img src="${project.image}" alt="${project.title} image" />`;
        content += `</div>`;
      }

      details.innerHTML = summary + content;
      container.appendChild(details);

      // Collect for filters
      years.add(project.year);
      types.add(project.type);
      locations.add(project.location);
      collaborations.add(project.collaboration);
    });

    // Populate filter options
    const fillFilter = (id, values) => {
      const select = document.getElementById(id);
      Array.from(values)
        .sort()
        .forEach((val) => {
          const option = document.createElement("option");
          option.value = val;
          option.textContent = val;
          select.appendChild(option);
        });
    };

    fillFilter("filter-year", years);
    fillFilter("filter-type", types);
    fillFilter("filter-location", locations);
    fillFilter("filter-collaboration", collaborations);
  });

// Filtering Logic
[
  "filter-year",
  "filter-type",
  "filter-location",
  "filter-collaboration",
].forEach((id) => {
  const select = document.getElementById(id);
  if (select) {
    select.addEventListener("change", filterProjects);
  }
});

function filterProjects() {
  const year = document.getElementById("filter-year").value.toLowerCase();
  const type = document.getElementById("filter-type").value.toLowerCase();
  const location = document
    .getElementById("filter-location")
    .value.toLowerCase();
  const collaboration = document
    .getElementById("filter-collaboration")
    .value.toLowerCase();

  document.querySelectorAll(".hdrLWF details").forEach((project) => {
    const matchesYear = year === "all" || project.dataset.year === year;
    const matchesType = type === "all" || project.dataset.type === type;
    const matchesLocation =
      location === "all" || project.dataset.location === location;
    const matchesCollaboration =
      collaboration === "all" ||
      project.dataset.collaboration === collaboration;

    project.style.display =
      matchesYear && matchesType && matchesLocation && matchesCollaboration
        ? "block"
        : "none";
  });
}
