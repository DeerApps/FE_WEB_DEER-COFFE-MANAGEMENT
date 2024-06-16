import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { RestaurantList, RestaurantListConfig } from 'src/types/restaurant.type'

const URL = 'restaurant'
const restaurantApi = {
  getRestaurant(params: RestaurantListConfig) {
    return http.get<SuccessResponse<RestaurantList>>(URL, {
      params
    })
  }
}

export default restaurantApi
