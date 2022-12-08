<template>
  <div class="card text-center elevation-2 selectable" @click="goTo">
    <img class="img-fluid rounded square-bottom" :src="car.imgUrl" alt="">
    <h5>{{ car.make }} | {{ car.model }} | {{ car.year }}</h5>
    <h5>${{ car.price }}</h5>
    <div class="p-2 text-start">{{ car.description }}</div>
    <button v-if="(car.creatorId == account.id)" @click="removeCar(car.id)"
      class="btn btn-danger delete-btn rounded-pill"><i class="  px-2 mdi mdi-delete-forever"></i></button>
    <div v-if="car.creator" class="creator text-end p-1">
      <img :src="car.creator.picture" alt="">
      <span>{{ car.creator.name }}</span>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { carsService } from '../services/CarsService.js';
import { useRouter } from 'vue-router';
export default {
  props: { car: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      async removeCar() {
        // note with props the id here is unused
        try {
          // NOTE you can pass the id from the template OR
          // await carsService.removeCar(id)
          // NOTE you can pull it from props
          await carsService.removeCar(props.car.id)
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      },
      goTo() {
        logger.log('pushing')
        router.push({ name: 'CarDetails', params: { id: props.car.id } })
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.card {
  position: relative;

  &:hover .delete-btn {
    display: block;
    opacity: 1;
  }

  .delete-btn {
    position: absolute;
    top: 3px;
    right: 3px;
    display: none;
    opacity: 0;
    transition: all .2s linear .5s;
  }

  img {
    height: 15vh;
    object-fit: cover;
  }

  .creator {
    img {
      height: 30px;
      border-radius: 50em;
      margin-right: .25em;
    }
  }
}
</style>