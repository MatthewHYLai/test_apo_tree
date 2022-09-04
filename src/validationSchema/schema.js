import * as yup from "yup";
// PART A

const tryParseJSONObject = (jsonString) => {
    try {
        let o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
  }
    

const schema = yup.object().shape({
    data: yup.string().required("Please enter your data"),
    rowNum : yup.number().min(1, "Please enter a positive number.").integer("Must be an Integer").required("Please enter the row number.").typeError("Please enter a number."),
     
 
    checkDupDataName : yup.string().ensure().when(["data"], {
        is: (a) => {
            if (a&&tryParseJSONObject(a)){
                
                let valueArr = JSON.parse(a).map(function(item){ return item.name });
                return valueArr.some(function(item, idx){ 
                    return valueArr.indexOf(item) != idx 
                });
                // return JSON.parse(a).filter((data)=>{
                //     return data.name.length>50
                // }).length > 0
            }else{
                return false
            }
        },
        then: yup.string().required("The names must be unique")
    }),

    checkDataName : yup.string().ensure().when(["data"], {
        is: (a) => {
            if (a&&tryParseJSONObject(a)){
                return JSON.parse(a).filter((data)=>{
                    return data.name.length>50
                }).length > 0
            }else{
                return false
            }
        },
        then: yup.string().required("The names must be less than 50 characters")
    }),


    checkRowNum : yup.string().ensure().when(["data", "rowNum"], {
        is: (a,b) => {
            if (a&&tryParseJSONObject(a)){
                return parseInt(b) > JSON.parse(a).length
            }else{
                return false
            }
        },
        then: yup.string().required("Row number must be less than or equal to the array length.")
    }),
})



// const formSchema = {
//     "schema" : schema,
// }

export default schema
