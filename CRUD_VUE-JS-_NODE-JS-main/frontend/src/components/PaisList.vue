<template>
  <div>
    <el-button type="primary" @click="mostrarFormulario = true" style="margin-bottom: 10px;">
      Agregar País
    </el-button>

    <PaisForm
      v-if="mostrarFormulario"
      :pais="paisSeleccionado"
      @actualizado="cargarPaises"
      @cancelar="cerrarFormulario"
    />

    <el-table :data="paises" style="width: 100%">
      <el-table-column prop="nombre" label="Nombre" />
      <el-table-column prop="capital" label="Capital" />
      <el-table-column prop="continente" label="Continente" />
      <el-table-column label="Acciones" width="180">
        <template #default="scope">
          <el-button size="mini" @click="editarPais(scope.row)">Editar</el-button>
          <el-button size="mini" type="danger" @click="eliminarPais(scope.row.id_pais)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPaises, deletePais } from '../api/api.js'
import PaisForm from './PaisForm.vue'

const paises = ref([])
const mostrarFormulario = ref(false)
const paisSeleccionado = ref(null)

const cargarPaises = async () => {
  try {
    const res = await getPaises()
    console.log('Datos recibidos de países:', res.data)  
    paises.value = res.data
    mostrarFormulario.value = false
    paisSeleccionado.value = null
  } catch {
    alert('Error cargando países')
  }
}

const editarPais = (pais) => {
  paisSeleccionado.value = pais
  mostrarFormulario.value = true
}

const eliminarPais = async (id) => {
  if (confirm('¿Eliminar país?')) {
    try {
      await deletePais(id)
      cargarPaises()
    } catch {
      alert('Error eliminando país')
    }
  }
}

const cerrarFormulario = () => {
  mostrarFormulario.value = false
  paisSeleccionado.value = null
}

onMounted(() => {
  cargarPaises()
})
</script>
