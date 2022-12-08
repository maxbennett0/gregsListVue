<template>
  <div class="container-fluid">
    <h1 class="text-center text-primary"> Cars</h1>
    <div class="row justify-content-center">
      <div class="col-8 bg-white p-3 elevation-1 rounded">
        <CarForm />
      </div>
    </div>

    <div class="row">

      <div v-for="c in cars" class="col-md-4 p-4">
        <CarCard :car="c" />
      </div>

    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { carsService } from '../services/CarsService.js'
export default {
  setup() {
    async function getCars() {
      try {
        await carsService.getCars()
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    onMounted(() => {
      getCars()
    })
    return {
      cars: computed(() => AppState.cars)
    }
  }
};
</script>


<style lang="scss" scoped>

</style>