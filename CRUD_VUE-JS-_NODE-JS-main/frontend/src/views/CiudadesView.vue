<template>
  <div>
    <h2>Ciudades</h2>
    <CiudadForm @actualizar="obtenerCiudades" :ciudadEditar="ciudadEditar" />
    <CiudadList :ciudades="ciudades" @editar="editarCiudad" @eliminar="eliminarCiudad" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CiudadForm from '../components/CiudadForm.vue';
import CiudadList from '../components/CiudadList.vue';

const ciudades = ref([]);
const ciudadEditar = ref(null);

const obtenerCiudades = async () => {
  try {
    const response = await axios.get('http://localhost:3000/ciudad');
    ciudades.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const editarCiudad = (ciudad) => {
  ciudadEditar.value = { ...ciudad };
};

const eliminarCiudad = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/ciudad/${id}`);
    obtenerCiudades();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  obtenerCiudades();
});
</script>

