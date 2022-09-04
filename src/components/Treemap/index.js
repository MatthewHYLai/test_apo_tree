import '../../App.scss';
import React, { useEffect, useState } from 'react';
import { useArray } from '../useArray.js';


function Treemap(props) {
  // const [rowNum, setRowNum] = useState();
  // const [parsedData, setParsedData] = useState();
  const [treemapContent, setTreemapContent] = useState();
  const widthList = useArray([]);
  // const sortedWidthList = useArray([]);
  const [sortedWidthList, setSortedWidthList] = useState();
    
  //calc the total weight
  const addingWeight = (items, prop) => {
    return items.reduce( function(a, b){
        return a + b[prop];
    }, 0);
  };

  useEffect(()=>{

    // check if parsed data and row num exist
    if(props.parsedData&&props.rowNum){

      let sum = addingWeight(props.parsedData, "weight")
      let maxRowWidth = Math.ceil(sum/props.rowNum);

      widthList.clear()
      setSortedWidthList([])

      // add width value to each data
      props.parsedData.map((data, index)=>{
        let boxWidth = (Math.floor((data.weight/maxRowWidth + Number.EPSILON) * 100) / 100)*100;

        // if width is more than 100, split it into mulitple boxes
        if (boxWidth> 100){

          for (let i = 0; i < Math.ceil(boxWidth/100); i++) {
            if(i===Math.ceil(boxWidth/100)-1){
              console.log(i);
              let cloneVar = JSON.parse(JSON.stringify(data))
              cloneVar.width = boxWidth-(100*i)

              //add id to each data for checking later
              cloneVar.id = boxWidth-(100*i)+"_"+data.name+"_"+i
              widthList.add(cloneVar)
            }else{
              console.log(i);
              let clone100 = JSON.parse(JSON.stringify(data))
              clone100.width = 100;

              //add id to each data for checking later
              clone100.id = 100+"_"+data.name+"_"+i
              widthList.add(clone100)
            }
          }

        }else{

          // add to widthList if width is less than 100 
          data.width = boxWidth;
          data.id = data.name+"_"+boxWidth;
          console.log("add ori", data)
          widthList.add(data)

        }
      })
    }
  }, [props.parsedData, props.rowNum])

  useEffect(()=>{
    if(props.parsedData&&widthList.value){
    // if(props.parsedData&&widthList.value&&props.parsedData.length===widthList.value.length){
      console.log("widthList", widthList.value);

      let tempList = widthList.value;

      let newList = [];
      setSortedWidthList([])
      
      widthList.value.map((data, index)=>{

        let currentSum = data.width;
        
        if (!newList.some(e => e.id === data.id)) {
          newList.push(data)
        
          for (const [i, element] of widthList.value.entries()) {

            if (index!==i && index<i && !newList.some(e => e.name === element.name)) {
              if (currentSum <100){
                if (currentSum + element.width<=100){
                  currentSum = currentSum + element.width;
                  newList.push(element)
                }
              } else {
  
                break;
              }
              setSortedWidthList(newList)
            }
          }
        }
      })
    }
  }, [widthList.value, props.parsedData])

  useEffect(()=>{
    if(sortedWidthList&&sortedWidthList.length>0&&props.rowNum){
      console.log("sortedWidthList",sortedWidthList)
      
      let boxList;
      boxList = sortedWidthList.map((data, index)=>{
        let boxHeight;
        let percent = (Math.round((data.value + Number.EPSILON) * 100) / 100)*100;
        let opacity = data.width
        
        return(
          <div className='boxWrap' style={{width : data.width+"%", height: "calc(100%/"+props.rowNum+")"}}  data-testid="boxWrap" key={index}>
            <div className='box' style={{backgroundColor: data.value > 0 ?"rgba(80, 200, 120, 1)":"rgba(245, 39, 39, 1)" }}>
              <p>{data.name}</p>
              <p>{percent}%</p>
            </div>
          </div>
        )
      })
      setTreemapContent(boxList)

    }
  }, [sortedWidthList, props.rowNum])


  
  return (
    <div className='treemap'>
      {treemapContent}
    </div>
  )
}

export default Treemap;
