import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { RestaurantList, RestaurantListConfig } from 'src/types/restaurant.type'

const URL = 'restaurant'

const restaurantApi = {
  getRestaurants(params: RestaurantListConfig) {
    return http.get<SuccessResponse<RestaurantList>>(URL, {
      params
    })
  },
  getSummary(){
    return http.get(`${URL}/summary`)
  },
  deleteRestaurant(params: { ID: string }) {
    return http.delete<SuccessResponse<String>>(URL, {
      params
    })
  },
  updateRestaurant(body: {
    resID: string
    manageID: string
    resName: string
    resAddress: string
    resChainID: string
  }) {
    return http.put<SuccessResponse<String>>(URL, body)
  },

  createRestaurant(body: { restaurantChainID: string; restaurantName: string; restaurantAddress: string; managerID: string }) {
    return http.post<SuccessResponse<String>>(URL, body)
  },
}

export default restaurantApi
