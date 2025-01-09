<template>
    <div>
      <h2>Gestión de Gastos</h2>
      <form @submit.prevent="crearGasto">
        <input v-model="descripcion" placeholder="Descripción del Gasto" />
        <input v-model.number="monto" type="number" placeholder="Monto" />
        <input v-model="fecha" type="date" />
        <select v-model="empleadoId">
          <option disabled value="">Selecciona un Empleado</option>
          <option v-for="empleado in empleados" :key="empleado.id" :value="empleado.id">
            {{ empleado.nombre }}
          </option>
        </select>
        <button type="submit">Registrar Gasto</button>
      </form>
  
      <h3>Filtrar Gastos</h3>
      <select v-model="departamentoId">
        <option value="">Todos los Departamentos</option>
        <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">
          {{ departamento.nombre }}
        </option>
      </select>
      <input v-model="fechaInicio" type="date" />
      <input v-model="fechaFin" type="date" />
      <button @click="filtrarGastos">Filtrar</button>
  
      <h3>Lista de Gastos</h3>
      <ul>
        <li v-for="gasto in gastos" :key="gasto.id">
          {{ gasto.descripcion }} - {{ gasto.monto }} - {{ gasto.fecha }} - {{ getEmpleadoNombre(gasto.empleadoId) }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from "@/services/api";
  
  export default {
    data() {
      return {
        descripcion: "",
        monto: "",
        fecha: "",
        empleadoId: "",
        departamentoId: "",
        fechaInicio: "",
        fechaFin: "",
        empleados: [],
        departamentos: [],
        gastos: [],
      };
    },
    methods: {
      async crearGasto() {
        try {
          const { data } = await api.post("/gastos", {
            descripcion: this.descripcion,
            monto: this.monto,
            fecha: this.fecha,
            empleadoId: this.empleadoId,
          });
          this.gastos.push(data);
          this.descripcion = "";
          this.monto = "";
          this.fecha = "";
          this.empleadoId = "";
        } catch (error) {
          console.error("Error al registrar gasto:", error);
        }
      },
      async filtrarGastos() {
        try {
          const { data } = await api.get("/gastos", {
            params: {
              departamentoId: this.departamentoId,
              fechaInicio: this.fechaInicio,
              fechaFin: this.fechaFin,
            },
          });
          this.gastos = data;
        } catch (error) {
          console.error("Error al filtrar gastos:", error);
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
      getEmpleadoNombre(empleadoId) {
        const empleado = this.empleados.find(emp => emp.id === empleadoId);
        return empleado ? empleado.nombre : "Desconocido";
      },
    },
    mounted() {
      this.fetchEmpleados();
      this.fetchDepartamentos();
    },
  };
  </script>
<style scoped>
/* Contenedor del formulario */
.form-container,
.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-container input,
.filter-container input,
.form-container select,
.filter-container select {
  flex: 1 1 calc(33.333% - 10px);
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-container button,
.filter-container button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex: 1 1 100%;
  font-size: 1rem;
}

.form-container button:hover,
.filter-container button:hover {
  background-color: #45a049;
}

/* Contenedor de los gastos */
.gastos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Estilo de las tarjetas de gastos */
.gasto-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gasto-card h4 {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}

.gasto-card p {
  margin: 0;
  font-size: 0.95rem;
  color: #666;
}
</style>

  