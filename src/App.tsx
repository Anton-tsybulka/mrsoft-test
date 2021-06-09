import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialRequest } from './redux/actions/wordsActions'
import { RootStateType } from './redux/store'
import { filtrationLength, filtrationSubstring } from './helpers/helpers'

let key = 0 

export const App: React.FC = () => {
  const data = useSelector<RootStateType, string []>(({words: {data}}) => data)
  const dispatch = useDispatch()
  const [value, setValue] = useState<number |string>('')
  const [filterArr, setFilterArr] = useState<Array<string>>([])
  const [isRegister, setIsRegister] = useState<boolean>(false)

  useEffect(() => {
    dispatch(initialRequest())
  }, [dispatch])

  
  
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => (
    setValue(e.currentTarget.value)
  )

  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => setIsRegister(e.currentTarget.checked)

  const clickLengthHandler = () => {
    if (typeof +value === 'number') {
      setFilterArr(filtrationLength(+value, data))
    }
  }

  const clickSubstringHandler = () => {        
    if (typeof value === 'string') {
      setFilterArr(filtrationSubstring(value, data, isRegister))
    }
  }
  
  return (
    <div>
      <div>
        <input 
          value={value}
          onChange={changeHandler}/>
      </div>
      <div>
        <button
          type='button'
          onClick={clickLengthHandler}>
            length
        </button>
      </div>
      <div>
        <button
          type='button'
          onClick={clickSubstringHandler}>
            substring
        </button>
      </div>
      <div>
        <span>Registr</span>
        <input 
          type='checkbox'
          onChange={changeCheckboxHandler} 
          checked={isRegister}>
        </input>
      </div>
      <div>
        {filterArr.map(item => (
          <p key={++key}>{item}</p>
        ) )}
      </div>
    </div>
  )
}