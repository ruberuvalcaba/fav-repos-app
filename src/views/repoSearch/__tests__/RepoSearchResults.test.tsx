import React from 'react'
import renderer from 'react-test-renderer'
import RepoSearchResults from '../RepoSearchResults'

it('RepoSearchResults component renders correctly', () => {
  const data = [
    {
      id: '73475252',
      name: 'react-native-calendars',
      fullName: 'wix/react-native-calendars',
      description: 'React Native Calendar Components',
      url: 'https://api.github.com/repos/wix/react-native-calendars',
      createdAt: new Date('2016-11-11T12:17:27Z'),
      stargazersCount: 8452,
      language: 'TypeScript',
    },
    {
      id: '36749153',
      name: 'react-native-code-push',
      fullName: 'microsoft/react-native-code-push',
      description: 'React Native module for CodePush',
      url: 'https://api.github.com/repos/microsoft/react-native-code-push',
      createdAt: new Date('2015-06-02T17:19:20Z'),
      stargazersCount: 8452,
      language: 'C',
    },
  ]
  const component = renderer.create(<RepoSearchResults results={data} onSelect={() => {}} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
