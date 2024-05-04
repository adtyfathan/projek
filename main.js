let data = 1;
const inputWrapper = document.querySelector(".input-wrapper");
const canvas = document.getElementById("pie-chart");
const ctx = canvas.getContext("2d");
const legend = document.getElementById("pie-chart-legend");

function addInput() {
  data++;
  const newInputContainer = document.createElement('div');
  newInputContainer.classList.add('input-container');
  newInputContainer.innerHTML = `
      <label for="data-${data}">Masukkan data ke-${data}</label>
      <div class="input-child">
        <input type="text" id="nama-${data}" class="text" name="nama-${data}" placeholder="nama-${data}" autofocus required>
        <input type="number" id="data-${data}" class="number" name="data-${data}" placeholder="data-${data}" autofocus required>
        <input type="color" id="color-${data}" class="color"/>
      </div>
  `;
  inputWrapper.appendChild(newInputContainer);
}

function downloadChart() {
  const downloadLink = document.createElement("a");
  downloadLink.href = canvas.toDataURL("image/png"); // Convert canvas to PNG image
  downloadLink.download = "pie_chart.png"; // Set the filename with .png extension
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function showPieChart() {
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

  values.forEach((value, index) => {
    const angle = (value.size / total) * Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      startAngle,
      startAngle + angle
    );
    ctx.closePath();
    ctx.fillStyle = value.color;
    ctx.fill();

    startAngle += angle;

    const newLegend = document.createElement('div');
    newLegend.classList.add('legend-item');
    newLegend.innerHTML = `
      <div class="legend-color" style="background-color:${values[index].color}"></div>
      <div class="legend-label">${values[index].name}: ${values[index].size} - ${(
        (values[index].size / total) *
        100
      ).toFixed(2)} %
      </div>
      `;
    legend.appendChild(newLegend);
  });
}
