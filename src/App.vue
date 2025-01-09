<template>
  <div id="app">
    <h1>Gestión de Departamentos, Empleados y Gastos</h1>
    <Departamentos />
    <Empleados />
    <Gastos />
  </div>
</template>

<script>
import Departamentos from "@/components/Departamentos-Empresa.vue";
import Empleados from "@/components/Empleados-Empresa.vue";
import Gastos from "@/components/Gastos-Empresa.vue";

export default {
  components: {
    Departamentos,
    Empleados,
    Gastos,
  },
};
</script>
