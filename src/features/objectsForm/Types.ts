export interface  IOptions {
  [name: string]: IOption[];
}

export interface IOption {
  value: string | number, label: string 
}

export interface ISelectedOptions {
  [name: string]: IOption | null
}