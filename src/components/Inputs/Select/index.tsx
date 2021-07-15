import { useCallback, useEffect, useRef } from 'react'

import Select from 'react-select'
import { Container } from './styles'

import { useField } from '@unform/core'

interface Option {
  value: any
  label: string
  isFixed?: boolean
  isDisabled?: boolean
}

// #ec993a
interface CustomTheme {
  primary25: string
  primary50: string
  primary: string
}

interface DefaultValue {
  label: string
  value: any
}

interface Props {
  name: string
  placeholder?: string
  options: Option[]
  onChange(value: any): void
  label?: string
  customTheme?: CustomTheme
  isErrored?: boolean
  height?: number
  defaultValue?: DefaultValue
}

const SingleSelect: React.FC<Props> = ({
  name,
  options,
  onChange,
  placeholder,
  label,
  customTheme,
  height,
  isErrored,
  defaultValue,
}) => {
  const inputRef = useRef(null)

  const { fieldName, error, registerField } = useField(name)

  const customThemeDefault = useCallback(theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'rgba(255, 164, 59, 0.25)',
        primary50: 'rgba(255, 164, 60, 0.5)',
        primary: 'rgb(255, 165, 62)',
      },
    }
  }, [])

  const customThemeFunction = useCallback(
    theme => {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          ...customTheme,
        },
      }
    },
    [customTheme],
  )
  useEffect(() => {
    if (inputRef) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      })
    }
  }, [fieldName, registerField])

  return (
    <Container isErrored={Number(error || isErrored)} heightSelect={height}>
      {label && <span>{label}</span>}
      {/* 'Sem opções' */}
      <Select
        noOptionsMessage={({ inputValue }: { inputValue: string }) =>
          'Sem opções'
        }
        theme={customThemeDefault || customThemeFunction}
        className="basic-single"
        classNamePrefix="select"
        name="color"
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        ref={inputRef}
      />
    </Container>
  )
}

export default SingleSelect
