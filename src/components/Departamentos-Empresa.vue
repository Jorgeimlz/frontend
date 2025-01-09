<template>
  <div>
    <h2>Gestión de Departamentos</h2>
    <form @submit.prevent="crearDepartamento">
      <input v-model="nombre" placeholder="Nombre del Departamento" />
      <button type="submit">Crear Departamento</button>
    </form>

    <h3>Lista de Departamentos</h3>
    <ul>
      <li v-for="departamento in departamentos" :key="departamento.id">
        {{ departamento.nombre }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Departamentos-Empresa", // Cambio aquí
  data() {
    return {
      nombre: "",
      departamentos: [],
    };
  },
  methods: {
    async crearDepartamento() {
      try {
        const { data } = await api.post("/departamentos", { nombre: this.nombre });
        this.departamentos.push(data);
        this.nombre = "";
      } catch (error) {
        console.error("Error al crear departamento:", error);
      }
    },
    async fetchDepartamentos() {
      try {
        const { data } = await api.get("/departamentos");
        this.departamentos = data;
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    },
  },
  mounted() {
    this.fetchDepartamentos();
  },
};
</script>
