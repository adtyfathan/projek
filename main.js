let data = 1;
const inputWrapper = document.querySelector(".input-wrapper");
const chartContainer = document.querySelector(".pie-chart-container");
const canvas = document.getElementById("pie-chart");
const ctx = canvas.getContext("2d");
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

function downloadChart() {
  const downloadLink = document.createElement("a");
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = "pie_chart.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function showPieChart(event) {
  event.preventDefault()
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
      <div class="legend-label">
        <h1>
          ${((values[index].size / total) * 100).toFixed(2)}% - ${values[index].name}
        </h1>
      </div>
      `;
    legend.appendChild(newLegend);
  });

  const downloadImg = document.createElement("img");
  downloadImg.src = "./asset/download.png";
  downloadImg.classList.add("download-button");
  downloadImg.onclick = () => downloadChart();
  chartContainer.appendChild(downloadImg);
}
