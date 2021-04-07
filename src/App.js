import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import "./App.css";
import StudentItem from './components/studentItem/studentItem';
import { render } from '@testing-library/react';

function App() {

  const [data, setData, getData] = useState([]);
  const [renderedData, setRendered] = useState([]);
  const [searchterm, setSearch] = useState("");
  const [tagterm, setTagTerm] = useState("");
  useLayoutEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
      .then(res => {
        const students = res.data.students;
        students.forEach((stu) => {
          stu.tags = [];
        })
        setData(students);
        setRendered(students);
      })
      .catch(e =>
        console.log("error: ", e)
      )
  }, []);

  const filterTags = (dat) => {
    const newData = dat.filter(student => {
      let stutags = student.tags;
      let contains = false;
      stutags.forEach((tag) => {
        if (!contains){
          contains = tag.includes(tagterm);
        }
      })
      return contains;
    })
    return newData;
  }

  const filterName = ( dat) => {
    const newData = dat.filter(student => {
      const fullName = (student.firstName + " " + student.lastName).toLowerCase();
      return fullName.includes(searchterm);
    })
    return newData;
  }
 
  //filter
  useEffect(() => {
    if (searchterm === "" && tagterm === "") {
      setRendered(data);
    }else if(searchterm === ""){
      setRendered(filterName(data))
    } else {
      const newData = filterName(renderedData);
      setRendered(newData);
    }

  }, [searchterm])

  useEffect (() => {
    if(tagterm ===  "" && searchterm === ""){
      setRendered(data)
    }else if(tagterm === ""){
      setRendered(filterName(data))
    }else{
      const newData = filterTags(renderedData)
      setRendered(newData)
    }
  }, [tagterm])

  return (
    <div className="App">
      <div className="students">
        <div className="container">
          <div className="searchbox">
            <input
              className="search"
              type="text"
              placeholder="search by name"
              value={searchterm}
              onChange={e => {
                setSearch(e.target.value);
              }} />
            <input
              className="search"
              type="text"
              placeholder="search by tag"
              value={tagterm}
              onChange={e => {
                setTagTerm(e.target.value);
              }} />
          </div>
          {renderedData.length > 0 ? renderedData.map((dat) => (
            <StudentItem dat={dat} />
          )):
          <p>no data</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
