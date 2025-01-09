<template>
  <div>
    <h2>Gestión de Empleados</h2>
    <form @submit.prevent="crearEmpleado">
      <input v-model="nombre" placeholder="Nombre del Empleado" />
      <select v-model="departamentoId">
        <option disabled value="">Selecciona un Departamento</option>
        <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">
          {{ departamento.nombre }}
        </option>
      </select>
      <button type="submit">Crear Empleado</button>
    </form>

    <h3>Lista de Empleados</h3>
    <ul>
      <li v-for="empleado in empleados" :key="empleado.id">
        {{ empleado.nombre }} - {{ getDepartamentoNombre(empleado.departamentoId) }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Empleados-Empresa", // Cambio aquí
  data() {
    return {
      nombre: "",
      departamentoId: "",
      empleados: [],
      departamentos: [],
    };
  },
  methods: {
    async crearEmpleado() {
      try {
        const { data } = await api.post("/empleados", { nombre: this.nombre, departamentoId: this.departamentoId });
        this.empleados.push(data);
        this.nombre = "";
        this.departamentoId = "";
      } catch (error) {
        console.error("Error al crear empleado:", error);
      }
    },
    async fetchEmpleados() {
      try {
        const { data } = await api.get("/empleados");
        this.empleados = data;
      } catch (error) {
        console.error("Error al cargar empleados:", error);
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
    getDepartamentoNombre(departamentoId) {
      const departamento = this.departamentos.find(dep => dep.id === departamentoId);
      return departamento ? departamento.nombre : "Desconocido";
    },
  },
  mounted() {
    this.fetchEmpleados();
    this.fetchDepartamentos();
  },
};
</script>
