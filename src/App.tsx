import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialRequest } from './redux/actions/wordsActions'
import { RootStateType } from './redux/store'
import { filtrationLength, filtrationSubstring, disableButton } from './helpers/helpers'

import './App.scss'

let key = 0 

export const App: React.FC = () => {
  const data = useSelector<RootStateType, string []>(({words: {data}}) => data)
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const [filterArr, setFilterArr] = useState<Array<string>>([])
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [isPattern, setIsPattern] = useState<boolean>(false)
  const [isBlur, setIsBlur] = useState<boolean>(false)
  const [isNumber, setIsNumber] = useState<boolean>(false)
  const [isString, setIsString] = useState<boolean>(false)

  useEffect(() => {
    dispatch(initialRequest())
  }, [dispatch]) 
   
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.match(/^[0-9]*$/) || 
      e.currentTarget.value.match(/^[A-Za-z]+$/)) {
      setValue(e.currentTarget.value)
      setIsPattern(false)
      setIsBlur(false)
      
      if (e.currentTarget.value.match(/^[0-9]*$/)) {
        setIsNumber(false)
        setIsString(true)
      } else {
        setIsNumber(true)
        setIsString(false)
      }
    } else {
      setIsPattern(true)
    }
  }  

  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => setIsRegister(e.currentTarget.checked)

  const blurHandler = () => {
    if(!value.length) setIsBlur(true)
  }

  const clickLengthHandler = () => {
    if(typeof +value === 'number') setFilterArr(filtrationLength(+value, data))
  }

  const clickSubstringHandler = () => {        
    if(typeof value === 'string') setFilterArr(filtrationSubstring(value, data, isRegister))
  }
  
  return (
    <div className='app'>
      <div className='app__input_enter'>
        <input 
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler} 
          autoFocus
          placeholder='number or substring'/>
        {!isPattern && !isBlur ?
          null :
          <div className='app__error'>
            <p>Is required! The field must contain numbers or a substring.</p>
          </div>}
      </div>
      <div className='app__button'>
        <div className='app__button__length'>
          <button
            type='button'
            onClick={clickLengthHandler}
            disabled={disableButton(isBlur, isNumber)}>
              length
          </button>
        </div>
        <div className='app__button__substring'>
          <button
            type='button'
            onClick={clickSubstringHandler}
            disabled={disableButton(isBlur, isString)}>
              substring
          </button>
        </div>
      </div>
      <div className='app__input__checkbox'>
        <span>Registr</span>
        <input 
          type='checkbox'
          onChange={changeCheckboxHandler} 
          checked={isRegister}>
        </input>
      </div>
      <div className='app__output'>
        {filterArr.map(item => (
          <p key={++key}>{item}</p>
        ) )}
      </div>
    </div>
  )
}