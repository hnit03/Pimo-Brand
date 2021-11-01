// import React from 'react'
// // import { withStyles } from "@material-ui/styles";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Check from "@material-ui/icons/Check";
// import workStyle from "../../../assets/workStyle";
// // const useStyles = withStyles(workStyle);

// function MyFormControlLabel({listStyle,checkedStyle,setCheckedStyle }) {
//    // const list =[];
//    // list.push(listStyle)
//    if(checkedStyle.length <= 0){
//       setCheckedStyle(listStyle)
//    }
   
// //    const classes = useStyles();
//    const handlerFilter = (e,item) =>{
//       const updateStyle = checkedStyle.map((value) => {
//          value.checked = value.id === item.id ? !value.checked : value.checked;
//          return value;
//       });
//       setCheckedStyle(updateStyle);
//    }
//    return (
//       <div>
//          {
//             (checkedStyle !== undefined) ? (
//                checkedStyle.map(item => (
//                    <FormControlLabel
//                      control={
//                         <Checkbox
//                            tabIndex={-1}
//                            checked={item.checked}
//                            value={item.id}
//                            checkedIcon={<Check   />}
//                            icon={<Check  />}
//                            onClick={(input) => handlerFilter(input, item)}
//                         //    classes={{
//                         //       checked: classes.checked,
//                         //       root: classes.checkRoot,
//                         //    }}
//                         />
//                      }
//                     //  classes={{ label: classes.label, root: classes.labelRoot }}
//                      label={item.name}
//                     //  className={classes.formControl}
//                   />
//                ))
//             ) : null
//          }
//       </div>
//    )
// }

// export default MyFormControlLabel
