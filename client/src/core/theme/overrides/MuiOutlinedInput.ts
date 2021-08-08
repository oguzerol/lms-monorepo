import palette from "../palette";

const MuiOutlinedInput = {
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0px 1000px ${palette} inset`,
      //undefined pallette works.
    },
  },
};

export default MuiOutlinedInput;
