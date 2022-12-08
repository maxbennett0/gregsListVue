import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CarsService {
  async getCars() {
    const res = await api.get('api/cars')
    logger.log('[GETTING CARS]', res.data)
    AppState.cars = res.data
  }

  async createCar(carData) {
    const res = await api.post('api/cars', carData)
    logger.log('[createCar]', res.data)
    // NOTE push add to the end of the list, if you want to add to the start of the list use unshift
    AppState.cars.push(res.data)
  }

  async removeCar(id) {
    const res = await api.delete('api/cars/' + id)
    logger.log('[DELETING CAR]', res.data)
    let index = AppState.cars.findIndex(c => c.id == id)
    if (index >= 0) {
      AppState.cars.splice(index, 1)
    }
  }
}

export const carsService = new CarsService()