<script setup>
import { ref, onMounted } from 'vue';

const colors = [
  { name: 'Красный', color: 'red' },
  { name: 'Зелёный', color: 'green' },
  { name: 'Синий', color: 'blue' },
  { name: 'Оранжевый', color: 'orange' },
  { name: 'Чёрный', color: 'black' },
];

const colorText = ref('');
const colorStyle = ref('');

function getRandomElement(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function updateColorAndPosition() {
  const colorName = getRandomElement(colors);
  const colorValue = getRandomElement(colors);

  const minXMarginPercent = 20;
  const minYMarginPercent = 10;

  const xPosition = minXMarginPercent + Math.random() * (100 - 2 * minXMarginPercent);
  const yPosition = minYMarginPercent + Math.random() * (100 - 2 * minYMarginPercent);

  colorText.value = colorName.name;
  colorStyle.value = `color: ${colorValue.color}; position: absolute; left: ${xPosition}vw; top: ${yPosition}vh;`;
}

onMounted(() => {
  updateColorAndPosition();
  setInterval(updateColorAndPosition, 1200); // Update color and position every 3 seconds
});
</script>

<template>
  <div>
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
</style>
