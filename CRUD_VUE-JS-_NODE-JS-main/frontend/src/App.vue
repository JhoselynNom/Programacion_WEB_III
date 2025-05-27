<template>
  <el-container style="height: 100vh;">
    <el-header>
      <el-menu :default-active="activeTab" mode="horizontal" @select="handleSelect">
        <el-menu-item index="paises">Países</el-menu-item>
        <el-menu-item index="ciudades">Ciudades</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <PaisList v-if="activeTab === 'paises'" />
      <CiudadList v-if="activeTab === 'ciudades'" />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import PaisList from './components/PaisList.vue'
import CiudadList from './components/CiudadList.vue'

const activeTab = ref('paises')

const handleSelect = (key) => {
  activeTab.value = key
}
</script>
