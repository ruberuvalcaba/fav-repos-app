import * as types from './repoTypes'
import API from '../api'
import { Repo } from '../types'

export default (dispatch: any) => {
  const addRepo = async (payload: Repo) => {
    try {
      const response = await API.addRepo(payload)
      if (response.status === 200) {
        dispatch({
          type: types.ADD_REPO_SUCCESS,
          value: payload,
        })
      }
      return response
    } catch (error) {
      dispatch({ type: types.ADD_REPO_FAILURE, error })
      throw error
    }
  }

  return {
    addRepo,
  }
}
