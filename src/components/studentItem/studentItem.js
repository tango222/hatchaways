import '../../App.css';
import {useState, useEffect} from 'react';
import InputTag from '../inputTag/inputTag';

const StudentItem = ({dat}) => {
  const [expanded, setExpanded] = useState(false);

  const getAverage = (arr) => {
    return arr.reduce((sume, el) => parseInt(sume) + parseInt(el)) / arr.length;
  }

  return (
    <div className="student">
      <div className="student-container">
        <div className="img-container"><img src={dat.pic} alt={"profile image of " + dat.firstname} className={"image"} /></div>
        <div className="content-container">
          <h1>{dat.firstName + " " + dat.lastName}</h1>
          <p>email: {dat.email}</p>
          <p>company: {dat.company}</p>
          <p>skill: {dat.skill}</p>
          <p>average: {getAverage(dat.grades) + "%"}</p>
          <InputTag dat={dat}/>
          {expanded ?
            <div className="grades">
              {dat.grades.map((grade, index) => (
                <p key={index} style={{margin: 0}}> Test {index + 1} : {grade}% </p>
              ))}
            </div> :
            null}
          
        </div>
        <button className="expand" onClick={() => setExpanded(!expanded)}>{expanded ? <span>-</span> : (<span>+</span>) }</button>
      </div>
    </div>
  );
}

export default StudentItem;