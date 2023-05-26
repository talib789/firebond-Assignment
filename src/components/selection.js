import { useState, useEffect } from 'react'

const defaultoptions = [
  { value: 'select', label: 'select', disabled: true },
  { value: 'constant', label: 'constant', disabled: false },
  { value: 'argument', label: 'argument', disabled: false },
  { value: 'And', label: 'And', disabled: false },
  { value: 'Or', label: 'Or', disabled: false },
];

const select ={select: "select"}

const Operator = (props) => {
  const [currentoption, setcurrentoption] = useState(["select"])
  const [selectvalue, setselectvalue] = useState([select]);
  const [result, setresult] = useState('undefined');
  const [globalindex, setglobalindex] = useState(0);
  const [selectedoption, setselectedoption] = useState([defaultoptions]);
  const [optionname, setoptionname] = useState(["default"]);
  const [addbutton, setaddbutton] = useState([]);
  const [globalvalue, setglobalvalue] = useState("undefined");

  useEffect(() => {
    addresult(globalvalue);
    let addoption = [...selectedoption];
    optionname.map((data, index) => {
      if (data === "argument") {
        addoption[index] = props.argument;
      }
    }
    )
    addargument(addoption);
  }, [props.largeMap, currentoption])

  const addargument = (addoption) => {
    setselectedoption(addoption);
  }

  const addresult = (finalvalue) => {
    if (selectvalue.length === 1) {
      setresult(props.largeMap.get(finalvalue) ? props.largeMap.get(finalvalue) : "undefined");
    }
    else {
      currentoption.map((data, index) => {
        if (data === "and" || data === "And") {
          if (props.largeMap.get(currentoption[index + 1]) === "false") {
            setresult("false");
          }
          else if ((props.largeMap.get(currentoption[index + 1])) === "true") {
            if ((props.largeMap.get(currentoption[index + 2]) === "true")) {
              setresult("true");
            }
            else {
              setresult("false");
            }
          }
        }
        if (data === "or" || data === "Or") {
          if ((props.largeMap.get(currentoption[index + 1])) === "false") {
            if ((props.largeMap.get(currentoption[index + 2]) === "false")) {
              setresult("false");
            }
            else {
              setresult("true");
            }
          }
          else if (props.largeMap.get(currentoption[index + 1]) === "true") {
            setresult("true");
          }
        }
      })
    }
  }

  const operatoroption = [
    { value: "and", label: "And", selected: true },
    { value: "or", label: "Or" },
  ]

  const operatorOroption = [
    { value: "or", label: "Or", selected: true },
    { value: "and", label: "And" },
  ]

  const addAction = (e, index) => {
    const getselectvalue = document.getElementsByClassName("operator")[index].value;
    let finalvalue = getselectvalue;
    { finalvalue = (getselectvalue === "argument") ? props.argument[0].value : getselectvalue }
    const addcurrentoption = [...currentoption];
    addcurrentoption[index] = finalvalue;
    setcurrentoption(addcurrentoption);
    setglobalvalue(finalvalue);
    addresult(finalvalue);
    if (getselectvalue === "constant") {
      let addoptionname = [...optionname];
      addoptionname[index] = "constant"
      setoptionname(addoptionname);
      finalvalue = props.constant[0].value;
      setglobalvalue(finalvalue);

      const addcurrentoption = [...currentoption];
      addcurrentoption[index] = finalvalue;
      setcurrentoption(addcurrentoption);

      let addoption = [...selectedoption];
      addoption[index] = props.constant;
      setselectedoption(addoption);

      var addselect = [...selectvalue];
      addselect[index] = select;
      setselectvalue(addselect);
      addresult(finalvalue);
    }
    else if (getselectvalue === "argument") {
      let addoptionname = [...optionname];
      addoptionname[index] = "argument";
      setoptionname(addoptionname);

      let addoption = [...selectedoption,];
      addoption[index] = props.argument;
      setselectedoption(addoption);

      var addselect = [...selectvalue];
      addselect[index] = select;
      setselectvalue(addselect);
    }
    else if (getselectvalue === "And" || getselectvalue === "Or") {
      var addselect = [...selectvalue];
      addselect[index] = select;
      addselect[index + 1] = select;
      addselect[index + 2] = select;
      setselectvalue(addselect);

      let addoption = [...selectedoption];
      addoption[index] = getselectvalue === "And" ? operatoroption : operatorOroption;
      addoption[index + 1] = defaultoptions;
      addoption[index + 2] = defaultoptions;

      let addnewbutton = [...addbutton];
      addnewbutton[index + 1] = "";
      addnewbutton[index + 2] = "";

      setaddbutton(addnewbutton);
      setselectedoption(addoption);
      setglobalindex(index + 2);
    }
  }
  const resetselect = (index) => {
    let addoptionname = [...optionname];
    addoptionname[index] = "default";
    setoptionname(addoptionname);

    var addselect = [...selectvalue];
    addselect[index] = select;
    setselectvalue(addselect);

    let addoption = [...selectedoption];
    addoption[index] = defaultoptions;
    setselectedoption(addoption);
    setresult("undefined");
  }

  const addselect = (index) => {
    const addselect = [...selectvalue];
    addselect[index] = select;
    setselectvalue(addselect);
    setglobalindex(index);

    let addoption = [...selectedoption];
    addoption[index] = defaultoptions;
    setselectedoption(addoption);
  }

  return (
    <>
      <div style={{ marginTop: "50px", marginLeft: "30px" }}>
        {selectvalue.map((selectdata, index) => {
          return (
            <>
              <div key={index}>
                <select className="operator" value={selectedoption[index] === defaultoptions ? selectdata.select : currentoption[index]} onChange={(e) => addAction(e, index)}>
                  {selectedoption[index].map((data, index) => {
                    return (
                      <option key={index} value={data.value} answer={data.answer} disabled={data.disabled} selected={data.selected}>{data.label}</option>
                    )
                  })}
                </select>
                <button onClick={() => resetselect(index)}>x</button>
                <br />
              </div>
            </>
          )
        })}
        {addbutton.map((data, index) => {
          return (
            <div key={index}>
              {(currentoption[index - 1] === "And" || currentoption[index - 1] === "Or" || currentoption[index - 1] === "or" || currentoption[index - 1] === "and") && <button onClick={() => addselect(globalindex + 1)}>+add op</button>}
            </div>
          )
        })}
        <div style={{ marginTop: "20px" }}>result:{result}</div>
      </div>
    </>
  )
}
export default Operator;