export interface IOptions {
   [name: string]: IOption[]
}

export interface IOption {
   value: string | number
   label: string
}

export interface ISelectedOptions {
   [name: string]: IOption | null
}

export interface ObjectsFormSelectProps {
   options: { value: string | number; label: string }[]
   placeholder: string
   isDisabled?: boolean
   isVisible?: boolean
   isClearable?: boolean
   name: string
   children: string
}
