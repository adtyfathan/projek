let data = 1;
const inputWrapper = document.querySelector(".input-wrapper");
const chartContainer = document.querySelector(".pie-chart-container");
const canvas = document.getElementById("pie-chart");
const legend = document.getElementById("pie-chart-legend");

function addInput() {
  data++;
  const newInputContainer = document.createElement('div');
  newInputContainer.classList.add('input-container');
  newInputContainer.innerHTML = `
      <label>Masukkan data ke-${data}</label>
      <div class="input-child">
        <input type="text" id="nama-${data}" class="text" placeholder="nama-${data}" autofocus required>
        <input type="number" id="data-${data}" class="number" placeholder="data-${data}" min="0" autofocus required>
        <input type="color" id="color-${data}" class="color"/>
      </div>
  `;
  inputWrapper.appendChild(newInputContainer);
}

function showPieChart(event) {
  event.preventDefault();
  let values = [];
  let total = 0;
  legend.innerHTML = "";
  for (i = 1; i <= data; i++) {
    const nameInput = document.getElementById(`nama-${i}`);
    const dataInput = document.getElementById(`data-${i}`);
    const colorInput = document.getElementById(`color-${i}`);
    values.push({ name: nameInput.value, size: parseInt(dataInput.value), color: colorInput.value });
    total += parseInt(dataInput.value);
  }

  let startAngle = 0;

  values.forEach((value) => {
    if (values.length == 1) {
      pathData = `
          M 250,250
          a 250,250 0 1,1 500,500
      `;
    } else {
      const sliceAngle = (value.size / total) * 2 * Math.PI;
      const x1 = (250 + 250 * Math.cos(startAngle)).toFixed(2);
      const y1 = (250 + 250 * Math.sin(startAngle)).toFixed(2);
      const x2 = (250 + 250 * Math.cos(startAngle + sliceAngle)).toFixed(2);
      const y2 = (250 + 250 * Math.sin(startAngle + sliceAngle)).toFixed(2);
      const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

      pathData = `
        M 250,250
        L ${x1},${y1}
        A 250,250 0 ${largeArcFlag} 1 ${x2},${y2}
        Z
      `;

      startAngle += sliceAngle;
    }

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", value.color);
    path.setAttribute("stroke", "#000");
    path.setAttribute("stroke-width", "0.2");

    canvas.appendChild(path);

    const newLegend = document.createElement('div');
    newLegend.classList.add('legend-item');
    newLegend.innerHTML = `
      <div class="legend-color" style="background-color:${value.color}"></div>
      <div class="legend-label">
        <h1>
          ${((value.size / total) * 100).toFixed(2)}% - ${value.name}
        </h1>
      </div>
      `;
    legend.appendChild(newLegend);
  });
}




