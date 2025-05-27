<template>
  <el-card class="box-card">
    <h2>{{ form.id_pais ? 'Editar País' : 'Agregar País' }}</h2>
    <el-form :model="form" ref="formRef" label-width="120px" :rules="rules" :validate-on-rule-change="true">
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>
      
      <el-form-item label="Capital" prop="capital">
        <el-input v-model="form.capital" autocomplete="off" />
      </el-form-item>
      
      <el-form-item label="Continente" prop="continente">
        <el-input v-model="form.continente" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="guardar">Guardar</el-button>
        <el-button @click="cancelar">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, watch, ref } from 'vue'
import { addPais, updatePais } from '../api/api.js'

const props = defineProps({ pais: Object })
const emit = defineEmits(['actualizado'])

const form = reactive({
  id_pais: null,
  nombre: '',
  capital: '',
  continente: ''
})

const formRef = ref(null)

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/
const regexCapital = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/
const regexContinente = /^.{2,100}$/ // Validación de longitud entre 2 y 100 caracteres

const rules = {
  nombre: [
    { required: true, message: 'El nombre es obligatorio', trigger: 'blur' },
    { pattern: regexNombre, message: 'Solo letras y espacios, entre 2 y 100 caracteres', trigger: 'blur' }
  ],
  capital: [
    { required: true, message: 'La capital es obligatoria', trigger: 'blur' },
    { pattern: regexCapital, message: 'Solo letras y espacios, entre 2 y 100 caracteres', trigger: 'blur' }
  ],
  continente: [
    { required: true, message: 'El continente es obligatorio', trigger: 'blur' },
    { pattern: regexContinente, message: 'Entre 2 y 100 caracteres', trigger: 'blur' }
  ]
}

watch(() => props.pais, (nuevoPais) => {
  if (nuevoPais) {
    form.id_pais = nuevoPais.id_pais
    form.nombre = nuevoPais.nombre
    form.capital = nuevoPais.capital
    form.continente = nuevoPais.continente
  } else {
    form.id_pais = null
    form.nombre = ''
    form.capital = ''
    form.continente = ''
  }
}, { immediate: true })

const guardar = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (form.id_pais) {
        await updatePais(form.id_pais, {
          nombre: form.nombre,
          capital: form.capital,
          continente: form.continente
        })
      } else {
        await addPais({
          nombre: form.nombre,
          capital: form.capital,
          continente: form.continente
        })
      }
      emit('actualizado')
    } catch {
      alert('Error guardando país')
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

