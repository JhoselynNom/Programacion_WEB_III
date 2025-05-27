<template>
  <div>
    <el-button type="primary" @click="mostrarFormulario = true" style="margin-bottom: 10px;">
      Agregar Ciudad
    </el-button>

    <CiudadForm
      v-if="mostrarFormulario"
      :ciudad="ciudadSeleccionada"
      @actualizado="cargarCiudades"
      @cancelar="cerrarFormulario"
    />

    <el-table :data="ciudades" style="width: 100%">
      <el-table-column prop="nombre" label="Nombre" />
      <el-table-column prop="poblacion" label="Población" />
      <el-table-column prop="region" label="Región" />
      <el-table-column label="Acciones" width="180">
        <template #default="scope">
          <el-button size="mini" @click="editarCiudad(scope.row)">Editar</el-button>
          <el-button size="mini" type="danger" @click="eliminarCiudad(scope.row.id_ciudad)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCiudades, deleteCiudad } from '../api/api.js'
import CiudadForm from './CiudadForm.vue'

const ciudades = ref([])
const mostrarFormulario = ref(false)
const ciudadSeleccionada = ref(null)

const cargarCiudades = async () => {
  try {
    const res = await getCiudades()
    ciudades.value = res.data
    mostrarFormulario.value = false
    ciudadSeleccionada.value = null
  } catch {
    alert('Error cargando ciudades')
  }
}

const editarCiudad = (ciudad) => {
  ciudadSeleccionada.value = ciudad
  mostrarFormulario.value = true
}

const eliminarCiudad = async (id) => {
  if (confirm('¿Eliminar ciudad?')) {
    try {
      await deleteCiudad(id)
      cargarCiudades()
    } catch {
      alert('Error eliminando ciudad')
    }
  }
}

const cerrarFormulario = () => {
  mostrarFormulario.value = false
  ciudadSeleccionada.value = null
}

onMounted(() => {
  cargarCiudades()
})
</script>

