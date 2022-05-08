import * as types from '../actionTypes'

const initialState = {
  channels: [],
  page: 1,
  per_page: 10,
  results: [],
  total_count: 0
}

export default function article(state = initialState, action) {
  switch (action.type) {
    case types.SET_CHANNELS:
      return { ...state, channels: action.payload }
    case types.SET_ARTICLES:
      return { ...state, ...action.payload }
    default:
      return state
  }
}