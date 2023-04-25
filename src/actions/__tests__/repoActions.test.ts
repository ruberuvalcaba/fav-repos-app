import repoActions from '../repoActions'
import * as types from '../actionTypes'
import API from '../../api'
import { Repo, SortOrder } from '../../types'

describe('repoActions module', () => {
  test('repoActions module should return an object literal', () => {
    expect(typeof repoActions).toBe('function')
  })

  let dispatch: jest.Mock

  beforeEach(() => {
    dispatch = jest.fn()
  })

  describe('getReposList', () => {
    it('should dispatch GET_REPO_LIST_SUCCESS action and return results', async () => {
      const results = ['repo1', 'repo2', 'repo3']
      const dispatch = jest.fn()
      API.getReposList = jest.fn().mockResolvedValue(results)

      const response = await repoActions(dispatch).getReposList()

      expect(API.getReposList).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith({
        type: types.GET_REPO_LIST_SUCCESS,
        value: results,
      })
      expect(response).toEqual(results)
    })

    it('should dispatch GET_REPO_LIST_FAILURE action and throw error if API call fails', async () => {
      const error = new Error('Failed to fetch repos')
      const dispatch = jest.fn()
      API.getReposList = jest.fn().mockRejectedValue(error)

      await expect(repoActions(dispatch).getReposList()).rejects.toThrow(error)

      expect(API.getReposList).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith({ type: types.GET_REPO_LIST_FAILURE, error })
    })
  })

  describe('addRepo', () => {
    const payload: Repo = {
      id: '123',
      name: 'test',
      fullName: 'testing full',
      description: 'this is a test',
      url: 'https://test.com',
      createdAt: new Date('2016-11-11T12:17:27Z'),
      stargazersCount: 10,
      language: 'Javascript',
    }
    it('dispatches ADD_REPO_SUCCESS when successful', async () => {
      const response = payload
      await API.addRepo(payload)
      const apiMock = jest.spyOn(API, 'addRepo').mockResolvedValue(response)
      const result = await repoActions(dispatch).addRepo(payload)

      expect(apiMock).toHaveBeenCalledWith(payload)
      expect(dispatch).toHaveBeenCalledWith({ type: types.ADD_REPO_SUCCESS, value: response })
      expect(result).toEqual(response)
    })

    it('dispatches ADD_REPO_FAILURE when API call fails', async () => {
      const error = new Error('addRepo failed')
      const apiMock = jest.spyOn(API, 'addRepo').mockRejectedValue(error)
      await expect(repoActions(dispatch).addRepo(payload)).rejects.toThrow(error)
      try {
        await repoActions(dispatch).addRepo(payload)
      } catch (e) {
        expect(apiMock).toHaveBeenCalledWith(payload)
        expect(dispatch).toHaveBeenCalledWith({
          type: types.ADD_REPO_FAILURE,
          error,
        })
        expect(e).toEqual(error)
      }
    })
  })

  describe('removeRepo', () => {
    it('dispatches REMOVE_REPO_SUCCESS when successful', async () => {
      const id = '123'
      const response = { status: 200, statusText: 'Ok', type: '' }
      await API.removeRepo(id)
      const apiMock = jest.spyOn(API, 'removeRepo').mockResolvedValue(response)
      const result = await repoActions(dispatch).removeRepo(id)

      expect(apiMock).toHaveBeenCalledWith(id)
      expect(dispatch).toHaveBeenCalledWith({ type: types.REMOVE_REPO_SUCCESS, value: id })
      expect(result).toEqual(response)
    })

    it('dispatches REMOVE_REPO_FAILURE when API call fails', async () => {
      const id = '123'
      const error = new Error('removeRepo failed')
      const apiMock = jest.spyOn(API, 'removeRepo').mockRejectedValue(error)
      try {
        await repoActions(dispatch).removeRepo(id)
      } catch (e) {
        expect(apiMock).toHaveBeenCalledWith(id)
        expect(dispatch).toHaveBeenCalledWith({
          type: types.REMOVE_REPO_FAILURE,
          error,
        })
        expect(e).toEqual(error)
      }
    })
  })

  describe('sortData', () => {
    const data: Repo[] = [
      {
        id: '123',
        name: 'test 1',
        fullName: 'testing full 1',
        description: 'this is a test',
        url: 'https://test.com/1',
        createdAt: new Date('2022-11-11T12:17:27Z'),
        stargazersCount: 0,
        language: 'Javascript',
      },
      {
        id: '1234',
        name: 'test 2',
        fullName: 'testing full 2',
        description: 'this is a test 1',
        url: 'https://test.com/2',
        createdAt: new Date('2023-11-11T12:17:27Z'),
        stargazersCount: 7890,
        language: 'Javascript',
      },
      {
        id: '1235',
        name: 'test 3',
        fullName: 'testing full 3',
        description: 'this is a test 3',
        url: 'https://test.com/3',
        createdAt: new Date('2018-11-11T12:17:27Z'),
        stargazersCount: 10,
        language: 'Javascript',
      },
    ]

    it('should sort data by createdAt ascending order', () => {
      const sortKey = 'createdAt'
      const sortOrder: SortOrder = 'asc'
      const sortedByCreatedAtAsc: Repo[] = [
        {
          createdAt: new Date('2018-11-11T12:17:27.000Z'),
          description: 'this is a test 3',
          fullName: 'testing full 3',
          id: '1235',
          language: 'Javascript',
          name: 'test 3',
          stargazersCount: 10,
          url: 'https://test.com/3',
        },
        {
          createdAt: new Date('2022-11-11T12:17:27.000Z'),
          description: 'this is a test',
          fullName: 'testing full 1',
          id: '123',
          language: 'Javascript',
          name: 'test 1',
          stargazersCount: 0,
          url: 'https://test.com/1',
        },
        {
          createdAt: new Date('2023-11-11T12:17:27.000Z'),
          description: 'this is a test 1',
          fullName: 'testing full 2',
          id: '1234',
          language: 'Javascript',
          name: 'test 2',
          stargazersCount: 7890,
          url: 'https://test.com/2',
        },
      ]

      repoActions(dispatch).sortData(data, sortKey, sortOrder)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SORT_REPO_LIST_COMPLETED',
        value: sortedByCreatedAtAsc,
      })
    })

    it('should sort data by createdAt descending order', () => {
      const sortKey = 'createdAt'
      const sortOrder: SortOrder = 'desc'
      const sortedByCreatedAtDesc: Repo[] = [
        {
          createdAt: new Date('2023-11-11T12:17:27.000Z'),
          description: 'this is a test 1',
          fullName: 'testing full 2',
          id: '1234',
          language: 'Javascript',
          name: 'test 2',
          stargazersCount: 7890,
          url: 'https://test.com/2',
        },
        {
          createdAt: new Date('2022-11-11T12:17:27.000Z'),
          description: 'this is a test',
          fullName: 'testing full 1',
          id: '123',
          language: 'Javascript',
          name: 'test 1',
          stargazersCount: 0,
          url: 'https://test.com/1',
        },
        {
          createdAt: new Date('2018-11-11T12:17:27.000Z'),
          description: 'this is a test 3',
          fullName: 'testing full 3',
          id: '1235',
          language: 'Javascript',
          name: 'test 3',
          stargazersCount: 10,
          url: 'https://test.com/3',
        },
      ]

      repoActions(dispatch).sortData(data, sortKey, sortOrder)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SORT_REPO_LIST_COMPLETED',
        value: sortedByCreatedAtDesc,
      })
    })

    it('should sort data by stargazersCount ascending order', () => {
      const sortKey = 'stargazersCount'
      const sortOrder: SortOrder = 'asc'
      const sortedByStargazersCountAsc: Repo[] = [
        {
          createdAt: new Date('2022-11-11T12:17:27.000Z'),
          description: 'this is a test',
          fullName: 'testing full 1',
          id: '123',
          language: 'Javascript',
          name: 'test 1',
          stargazersCount: 0,
          url: 'https://test.com/1',
        },
        {
          createdAt: new Date('2018-11-11T12:17:27.000Z'),
          description: 'this is a test 3',
          fullName: 'testing full 3',
          id: '1235',
          language: 'Javascript',
          name: 'test 3',
          stargazersCount: 10,
          url: 'https://test.com/3',
        },
        {
          createdAt: new Date('2023-11-11T12:17:27.000Z'),
          description: 'this is a test 1',
          fullName: 'testing full 2',
          id: '1234',
          language: 'Javascript',
          name: 'test 2',
          stargazersCount: 7890,
          url: 'https://test.com/2',
        },
      ]

      repoActions(dispatch).sortData(data, sortKey, sortOrder)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SORT_REPO_LIST_COMPLETED',
        value: sortedByStargazersCountAsc,
      })
    })

    it('should sort data by stargazersCount descending order', () => {
      const sortKey = 'stargazersCount'
      const sortOrder: SortOrder = 'desc'
      const sortedByStargazersCountDes: Repo[] = [
        {
          createdAt: new Date('2023-11-11T12:17:27.000Z'),
          description: 'this is a test 1',
          fullName: 'testing full 2',
          id: '1234',
          language: 'Javascript',
          name: 'test 2',
          stargazersCount: 7890,
          url: 'https://test.com/2',
        },
        {
          createdAt: new Date('2018-11-11T12:17:27.000Z'),
          description: 'this is a test 3',
          fullName: 'testing full 3',
          id: '1235',
          language: 'Javascript',
          name: 'test 3',
          stargazersCount: 10,
          url: 'https://test.com/3',
        },
        {
          createdAt: new Date('2022-11-11T12:17:27.000Z'),
          description: 'this is a test',
          fullName: 'testing full 1',
          id: '123',
          language: 'Javascript',
          name: 'test 1',
          stargazersCount: 0,
          url: 'https://test.com/1',
        },
      ]

      repoActions(dispatch).sortData(data, sortKey, sortOrder)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SORT_REPO_LIST_COMPLETED',
        value: sortedByStargazersCountDes,
      })
    })
  })
})
