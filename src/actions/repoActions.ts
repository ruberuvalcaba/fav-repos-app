import * as types from './repoTypes'
import API from '../api'
import { Repo } from '../types'

export default (dispatch: any) => {
  const getReposList = async () => {
    try {
      const results = await API.getReposList()

      dispatch({
        type: types.GET_REPO_LIST_SUCCESS,
        value: results,
      })
      return results
    } catch (error) {
      dispatch({ type: types.GET_REPO_LIST_FAILURE, error })
      throw error
    }
  }
  const addRepo = async (payload: Repo) => {
    try {
      const response = await API.addRepo(payload)
      if (response?.id) {
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
    getReposList,
  }
}
