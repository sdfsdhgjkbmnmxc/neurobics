<script setup>
import { ref, onMounted } from 'vue';

const colors = [
  { name: 'Красный', color: 'red' },
  { name: 'Зелёный', color: 'green' },
  { name: 'Синий', color: 'blue' },
  { name: 'Оранжевый', color: 'orange' },
  { name: 'Чёрный', color: 'black' },
];

const speeds = [
  { label: 'Медленно', value: 3000 },
  { label: 'Нормально', value: 2000 },
  { label: 'Быстро', value: 1000 }
];

function defaultSpeed() {
  return speeds[1].value;
}

const currentSpeed = ref(Number(localStorage.getItem('updateSpeed')) || defaultSpeed());

const colorText = ref('');
const colorStyle = ref('');
const updateInterval = ref(Number(localStorage.getItem('updateSpeed')) || defaultSpeed());
let intervalId = null;

function getRandomElement(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function changeSpeed(newSpeed) {
  currentSpeed.value = newSpeed;
  updateInterval.value = newSpeed;
  localStorage.setItem('updateSpeed', newSpeed);
  clearInterval(intervalId);
  intervalId = setInterval(updateColorAndPosition, newSpeed);
}

function updateColorAndPosition() {
   let colorName, colorValue;

  if (Math.random() < 0.1) {
    colorName = { name: 'ХЛОПОК' };
    colorValue = { color: 'black' };
  } else {
    colorName = getRandomElement(colors);
    colorValue = getRandomElement(colors);
  }

  const minXMarginPercent = 20;
  const minYMarginPercent = 10;

  const xPosition = minXMarginPercent + Math.random() * (100 - 2 * minXMarginPercent);
  const yPosition = minYMarginPercent + Math.random() * (100 - 2 * minYMarginPercent);

  colorText.value = colorName.name;
  colorStyle.value = `color: ${colorValue.color}; position: absolute; left: ${xPosition}vw; top: ${yPosition}vh;`;
}

onMounted(() => {
  updateColorAndPosition();
  // setInterval(updateColorAndPosition, 1200); // Update color and position every 3 seconds
  intervalId = setInterval(updateColorAndPosition, updateInterval.value);
});

</script>

<template>
  <div>
    <div class="speed-controls">
      <button
          v-for="speed in speeds"
          :key="speed.value"
          :class="{ active: currentSpeed === speed.value }"
          @click="changeSpeed(speed.value)"
      >
        {{ speed.label }}
      </button>
    </div>
    <p :style="colorStyle">{{ colorText }}</p>
  </div>
</template>

<style>
body {
  background: white !important;
}
p {
  font-size: 5em;
  width: fit-content;
  margin: 0;
  font-weight: bold;
}
.speed-controls {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
}
.speed-controls button {
  margin: 0 10px;
  padding: 5px 20px;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: #e0e0e0;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
.speed-controls button:hover {
  background-color: #d0d0d0;
}
.speed-controls button.active {
  color: white;
  background-color: #007BFF; /* Bright blue */
  border-color: #007BFF;
}
</style>
