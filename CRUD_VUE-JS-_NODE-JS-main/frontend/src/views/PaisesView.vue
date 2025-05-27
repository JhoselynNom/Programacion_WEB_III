<template>
  <div>
    <h2>Países</h2>
    <PaisForm @actualizar="obtenerPaises" :paisEditar="paisEditar" />
    <PaisList :paises="paises" @editar="editarPais" @eliminar="eliminarPais" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PaisForm from '../components/PaisForm.vue';
import PaisList from '../components/PaisList.vue';

const paises = ref([]);
const paisEditar = ref(null);

const obtenerPaises = async () => {
  try {
    const response = await axios.get('http://localhost:3000/pais');
    paises.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const editarPais = (pais) => {
  paisEditar.value = { ...pais };
};

const eliminarPais = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/pais/${id}`);
    obtenerPaises();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  obtenerPaises();
});
</script>
