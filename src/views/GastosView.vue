<template>
    <div>
      <h1>Gastos por Departamento</h1>
      <label>Filtrar por fecha:</label>
      <input type="date" v-model="fechaInicio" />
      <input type="date" v-model="fechaFin" />
      <button @click="filtrarGastos">Filtrar</button>
      
      <ul>
        <li v-for="gasto in gastos" :key="gasto.id">
          {{ gasto.descripcion }} - {{ gasto.monto }} - {{ gasto.fecha }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        gastos: [],
        fechaInicio: '',
        fechaFin: '',
      };
    },
    methods: {
      async filtrarGastos() {
        const { data } = await api.get('/gastos', {
          params: {
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin,
          },
        });
        this.gastos = data;
      },
    },
    async mounted() {
      const { data } = await api.get('/gastos');
      this.gastos = data;
    },
  };
  </script>
  