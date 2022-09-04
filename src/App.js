import logo from './logo.svg';
import './App.scss';
import React, { useEffect, useState } from 'react';
import {useForm, FormProvider} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {yupResolver} from '@hookform/resolvers/yup';
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { useArray } from './components/useArray.js';
import schema from './validationSchema/schema.js'
import * as yup from "yup";
import Treemap from './components/Treemap'

function App() {
  const [rowNum, setRowNum] = useState();
  const [inputData, setInputData] = useState();
  const [parsedData, setParsedData] = useState();
  const [treemapContent, setTreemapContent] = useState();
  const widthList = useArray([]);
  // const sortedWidthList = useArray([]);
  const [sortedWidthList, setSortedWidthList] = useState();
  
  // const schema = yup.object().shape({
  //   data: yup.string().required().typeError("Please enter your data"),
  //   rowNum : yup.number().min(1).integer("questionnaire:errors.inputAnswer").required("Please enter the row number").typeError("Please enter a positive number"),
  //   checkRowNum : yup.string().ensure().when(['data', "rowNum"], {
  //       is: (a,b) => {
  //           if (a&&tryParseJSONObject(a)){
  //               return parseInt(b) <= JSON.parse(a).length
  //           }else{
  //               return false
  //           }
  //       },
  //       then: yup.string().required("questionnaire:sectionC.schema.numberNotMatch")
  //   }),
  // })


    // init hook form
  const formMethods = useForm({
    mode: "all",
    criteriaMode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  

  const errors = formMethods.formState.errors
  const register = formMethods.register
  const handleSubmit = formMethods.handleSubmit
  const formState = formMethods.formState
  const watch = formMethods.watch
  const setError = formMethods.setError
  const clearErrors = formMethods.clearErrors
  const getValues = formMethods.getValues

 


   // Check form state
   useEffect(() => {
    const subscription = watch((value, { name, type }) => {
        console.log(value, name, type)
    });
    return () => subscription.unsubscribe();
  }, [watch]);



  const handleData = (data) => {
    setInputData(data.data)
    setRowNum(data.rowNum)
  };

  //check if data is valid JSON
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
    

  useEffect(()=>{
    //check if inputData exist and is valid json
    if(inputData&&tryParseJSONObject(inputData)){
      
      // check if parsed data is in array format and no more than 50 data entered
      if(Array.isArray(JSON.parse(inputData))&&JSON.parse(inputData).length<= 50){

        // sort data in descending order
        let data = [...JSON.parse(inputData)].sort((a, b) => b.weight - a.weight)
        
        //check if row num is less than number of data
        if(parseInt(getValues("rowNum")) <= JSON.parse(getValues("data")).length){
          clearErrors("checkRowNum")
          let over50 = false;
          
          // check if all data names are less than 50 characters
          JSON.parse(watch("data")).map((obj, index) => {
            if (obj.name.length>50){
              over50=true
            }

            if(index>=JSON.parse(watch("data")).length-1){
              
              if(over50){
                setError("checkDataName")
              }else{
                clearErrors("checkDataName")
                setParsedData(data)

              }
            }
          })

        }else{
          console.log("rowNum", parseInt(getValues("rowNum")));
          console.log("length", JSON.parse(getValues("data")).length);
          setInputData(undefined)
          setRowNum(undefined)
          setTreemapContent(undefined)
          setParsedData(undefined)
          setError("checkRowNum")
        }
      }
    }
  }, [inputData])

    
  // useEffect(()=>{

  //   // check if parsed data and row num exist
  //   if(parsedData&&rowNum){

  //     let sum = addingWeight(parsedData, "weight")
  //     let maxRowWidth = Math.ceil(sum/rowNum);

  //     widthList.clear()
  //     setSortedWidthList([])

  //     // add width value to each data
  //     parsedData.map((data, index)=>{
  //       let boxWidth = (Math.floor((data.weight/maxRowWidth + Number.EPSILON) * 100) / 100)*100;

  //       // if width is more than 100, split it into mulitple boxes
  //       if (boxWidth> 100){

  //         for (let i = 0; i < Math.ceil(boxWidth/100); i++) {
  //           if(i===Math.ceil(boxWidth/100)-1){
  //             console.log(i);
  //             let cloneVar = JSON.parse(JSON.stringify(data))
  //             cloneVar.width = boxWidth-(100*i)

  //             //add id to each data for checking later
  //             cloneVar.id = boxWidth-(100*i)+"_"+data.name+"_"+i
  //             widthList.add(cloneVar)
  //           }else{
  //             console.log(i);
  //             let clone100 = JSON.parse(JSON.stringify(data))
  //             clone100.width = 100;

  //             //add id to each data for checking later
  //             clone100.id = 100+"_"+data.name+"_"+i
  //             widthList.add(clone100)
  //           }
  //         }

  //       }else{

  //         // add to widthList if width is less than 100 
  //         data.width = boxWidth;
  //         data.id = data.name+"_"+boxWidth;
  //         console.log("add ori", data)
  //         widthList.add(data)

  //       }
  //     })
  //   }
  // }, [parsedData, rowNum])

  // useEffect(()=>{
  //   if(parsedData&&widthList.value){
  //   // if(parsedData&&widthList.value&&parsedData.length===widthList.value.length){
  //     console.log("widthList", widthList.value);

  //     let tempList = widthList.value;

  //     let newList = [];
  //     setSortedWidthList([])
      
  //     widthList.value.map((data, index)=>{

  //       let currentSum = data.width;
        
  //       if (!newList.some(e => e.id === data.id)) {
  //         newList.push(data)
        
  //         for (const [i, element] of widthList.value.entries()) {

  //           if (index!==i && index<i && !newList.some(e => e.name === element.name)) {
  //             if (currentSum <100){
  //               if (currentSum + element.width<=100){
  //                 currentSum = currentSum + element.width;
  //                 newList.push(element)
  //               }
  //             } else {
  
  //               break;
  //             }
  //             setSortedWidthList(newList)
  //           }
  //         }
  //       }
  //     })
  //   }
  // }, [widthList.value, parsedData])

  // useEffect(()=>{
  //   if(sortedWidthList&&sortedWidthList.length>0&&rowNum){
  //     console.log("sortedWidthList",sortedWidthList)
      
  //     let boxList;
  //     boxList = sortedWidthList.map((data, index)=>{
  //       let boxHeight;
  //       let percent = (Math.round((data.value + Number.EPSILON) * 100) / 100)*100;
  //       let opacity = data.width
        
  //       return(
  //         <div className='boxWrap' style={{width : data.width+"%", height: "calc(100%/"+rowNum+")"}}>
  //           <div className='box' style={{backgroundColor: data.value > 0 ?"rgba(80, 200, 120, 1)":"rgba(245, 39, 39, 1)" }}>
  //             <p>{data.name}</p>
  //             <p>{percent}%</p>
  //           </div>
  //         </div>
  //       )
  //     })
  //     setTreemapContent(boxList)

  //   }
  // }, [sortedWidthList, rowNum])


  return (
    <div className="App">
      <main>
        <div className='contentWrap'>
          <form onSubmit={handleSubmit(handleData)} className="dataForm">
            <div className='fieldWrap'>
              <p><label htmlFor="data">Data:</label></p>
              <TextareaAutosize
                  name="data"
                  aria-label="minimum height"
                  minRows={20}
                  placeholder="Minimum 3 rows"
                  style={{ width: "100%" }}
                  {...register("data")}
                />
            </div>

            <div className='fieldWrap'>
              <p><label htmlFor="rowNum">Rows: </label></p>
              <TextField
                name="rowNum"
                defaultValue={8}
                autoComplete="off"
                style={{ width: "100%" }}
                {...register("rowNum")}
              />
            </div>
            <div className='errorWrap'>
              {errors && Object.keys(errors).length !== 0 && Object.entries(errors).map(([key, error]) => (
                  <p key={key} style={{color: "red"}}>{error.message}</p>
              ))}
            </div>
            <button type="submit" variant="contained" color="primary">
                Add
            </button>
          </form>  
          <div className='treemapWrap'>
            <p>Result</p>  
            <Treemap parsedData={parsedData} rowNum={rowNum}/>
            {/* <div className='treemap'>
              {treemapContent}
            </div> */}
          </div>          
        </div>
      </main>
    </div>
  );
}

export default App;
