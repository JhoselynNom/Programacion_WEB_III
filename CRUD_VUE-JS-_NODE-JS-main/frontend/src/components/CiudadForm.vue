<template>
  <el-card class="box-card">
    <h2>{{ ciudadLocal.id_ciudad ? 'Editar Ciudad' : 'Agregar Ciudad' }}</h2>
    <el-form :model="ciudadLocal" ref="formRef" label-width="120px" :rules="rules">
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="ciudadLocal.nombre" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Población" prop="poblacion">
        <el-input v-model.number="ciudadLocal.poblacion" type="number" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Región" prop="region">
        <el-input v-model="ciudadLocal.region" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="guardarCiudad">Guardar</el-button>
        <el-button @click="cancelar">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { addCiudad, updateCiudad } from '../api/api.js'

const props = defineProps({ ciudad: Object })
const emit = defineEmits(['actualizado'])

const ciudadLocal = ref({
  id_ciudad: null,
  nombre: '',
  poblacion: 1,
  region: ''
})

const formRef = ref(null)

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,100}$/
const regexRegion = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,100}$/

const rules = {
  nombre: [
    { required: true, message: 'El nombre es obligatorio', trigger: 'blur' },
    { pattern: regexNombre, message: 'Solo letras y espacios, entre 3 y 100 caracteres', trigger: 'blur' }
  ],
  poblacion: [
    { type: 'number', required: true, message: 'La población es obligatoria', trigger: 'change', min: 1 }
  ],
  region: [
    { required: true, message: 'La región es obligatoria', trigger: 'blur' },
    { pattern: regexRegion, message: 'Solo letras y espacios, entre 4 y 100 caracteres', trigger: 'blur' }
  ]
}

watch(
  () => props.ciudad,
  (newVal) => {
    if (newVal) {
      ciudadLocal.value = { ...newVal }
    } else {
      ciudadLocal.value = {
        id_ciudad: null,
        nombre: '',
        poblacion: 1,
        region: ''
      }
    }
  },
  { immediate: true }
)

const guardarCiudad = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (ciudadLocal.value.id_ciudad) {
        await updateCiudad(ciudadLocal.value.id_ciudad, ciudadLocal.value)
      } else {
        await addCiudad(ciudadLocal.value)
      }
      emit('actualizado')
    } catch {
      alert('Error guardando ciudad')
    }
  })
}

const cancelar = () => {
  emit('actualizado')
}
</script>

<style scoped>
.box-card {
  max-width: 500px;
  margin: 20px auto;
}
</style>

