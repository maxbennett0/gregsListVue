<template>

  <form @submit.prevent="handleSubmit()" class="row justify-content-end">
    <div class="mb-3 col-3">
      <label for="" class="form-label">Make</label>
      <input type="text" class="form-control" v-model="editable.make" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">{{ editable.make }}</small>
    </div>
    <div class="mb-3 col-3">
      <label for="" class="form-label">Model</label>
      <input type="text" class="form-control" v-model="editable.model" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">{{ editable.model }}</small>
    </div>
    <div class="mb-3 col-3">
      <label for="" class="form-label">Year</label>
      <input type="number" class="form-control" v-model="editable.year" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">Help text</small>
    </div>
    <div class="mb-3 col-3">
      <label for="" class="form-label">Price</label>
      <input type="number" class="form-control" v-model="editable.price" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">Help text</small>
    </div>
    <div class="mb-3 col-12">
      <label for="" class="form-label">ImgUrl</label>
      <input type="url" class="form-control" v-model="editable.imgUrl" name="" id="" aria-describedby="helpId"
        placeholder="">
      <img :src="editable.imgUrl" class="img-fluid" alt="">
    </div>
    <div class="mb-3 col-12">
      <label for="" class="form-label">Description</label>
      <textarea name="" id="" class="form-control" v-model="editable.description" rows="3"></textarea>
      <small id="helpId" class="form-text text-muted">Help text</small>
    </div>
    <div class="mb-3 col-4">
      <button class="btn  w-100 rounded-pill selectable text-danger darken-20" type="button"
        @click="editable = {}">Cancel</button>
    </div>
    <div class="mb-3 col-4">
      <button v-if="!carData.id" class="btn btn-primary w-100 rounded-pill">Create</button>
      <button v-else class="btn btn-success w-100 rounded-pill">Save</button>
    </div>
  </form>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { carsService } from '../services/CarsService.js';
export default {
  props: { carData: { type: Object, default: {} } },
  // NOTE emit is black magic and should only be used in very rare cases AKA not friday
  setup(props, { emit }) {
    // let editable = reactive({})
    onMounted(() => {
      editable.value = props.carData
    })
    const editable = ref({})
    async function createCar() {
      try {
        // NOTE if using ref in setup, you must access the value
        // await carsService.createCar(editable.value)
        await carsService.createCar(editable.value)
        editable.value = {}
        Pop.toast('created Car', 'success')
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }
    async function editCar() {
      try {
        // NOTE if using ref in setup, you must access the value
        // await carsService.createCar(editable.value)
        await carsService.editCar(editable.value)
        // editable.value = {}
        Pop.toast('edited Car', 'success')
        // NOTE emit tells the parent this event has happened
        emit('carEdited')
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }
    return {
      editable,
      async handleSubmit() {
        if (props.carData.id) {
          await editCar()
        } else {
          await createCar()
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>