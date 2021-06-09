import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialRequest } from './redux/actions/wordsActions'
import { RootStateType } from './redux/store'

export const App: React.FC = () => {
  const data = useSelector<RootStateType, string []>(({words: {data}}) => data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialRequest())
  }, [dispatch])
  
  console.log('app data: ', data)
  

  return (
    <p>
      Hello
    </p>
  )
}