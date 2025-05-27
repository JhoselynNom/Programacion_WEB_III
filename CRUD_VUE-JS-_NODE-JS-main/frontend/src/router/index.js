import { createRouter, createWebHistory } from 'vue-router';
import PaisList from '../components/PaisList.vue';
import CiudadList from '../components/CiudadList.vue';
import CiudadForm from '../components/CiudadForm.vue';

const routes = [
  { path: '/', redirect: '/paises' },
  { path: '/paises', component: PaisList },

  { path: '/ciudades', component: CiudadList },
  { path: '/ciudades/nueva', component: CiudadForm },
  { path: '/ciudades/editar/:id', name: 'EditarCiudad', component: CiudadForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

