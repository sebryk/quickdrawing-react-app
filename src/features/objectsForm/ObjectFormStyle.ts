import { GroupBase, StylesConfig } from "react-select";
import { IOption } from "./Types";

export const styles: StylesConfig<IOption, false, GroupBase<IOption>> = {
  control: (base, state) => ({
    ...base,
    width: "200px",
    height: "40px",
    borderRadius: "20px",
    textAlign: "left",
    paddingLeft: "5px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    backgroundColor: state.menuIsOpen ? "#E7E7E7" : state.isDisabled ? "#474747" : "#FFFFFF",
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    color: state.isDisabled ? "#191919" : "#7F7F7F",
    transition: '0.3s',
    ':hover': {
      backgroundColor: "#E7E7E7",
      },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "20px",
    marginTop: '2px',

  }),
  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#191919" : "#7F7F7F",
    opacity: state.isDisabled ? '0.5' : '1',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#191919" : "#7F7F7F",
    opacity: state.isDisabled ? '0.5' : '1',
    ':hover': {
      backgroundColor: "none",
    },
  }),
  menuList: (base) => ({
    ...base,
    borderRadius: "20px",
    paddingTop: 0,
    paddingBottom: 0,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#7F7F7F",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "#F12354" : "#7F7F7F",
    backgroundColor: state.isSelected ? "#FFFFFF" : '',
    textAlign: "left",
    paddingLeft: "10px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    paddingBlock: '10px',
    ':hover': {
    backgroundColor: "#E7E7E7",
    },
    border: 0,
  }),
}