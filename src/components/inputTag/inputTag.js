import '../../App.css';
import {useState, useEffect, createRef} from 'react';

const InputTag = ({dat}) => {
  const [tags, setTags] = useState([]);
  let tagInput = createRef();

  const onInputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if(tags.find(tag => tag.toLowerCase() === val.toLowerCase())){
        return
      }
      setTags([...tags, val]);
      tagInput.current.value = null;
    }
  }

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags([...newTags])
  }

  useEffect(() => {
    dat.tags = tags;
  }, [tags])

  return (
    <div className="input-tag">
      <div className="tags">
        <ul className="taglist">
        { tags.map((tag, i) => (
          <li key={tag}>
            <Tag value = {tag} i={i} removeTag={removeTag}/>
          </li>
        ))
        }
        </ul>
      </div>
      <input 
        className="search" 
        type="text" 
        placeholder="Add a Tag"
        style={{
          height: '25px',
          width: '40%',
          fontSize: '16px',
          padding: 0
        }}
        ref={tagInput}
        onKeyDown = {(e) => onInputKeyDown(e)}
        />
    </div>
  )
}

const Tag = ({value, i, removeTag}) => {
  return(
    <div className="tag">
      <p style={{fontStyle: "normal", color: "grey", fontSize: "16px", fontWeight: 400}}>{value}</p>
      <button className="delete" onClick = {() => removeTag(i)}>
        <p style={{fontStyle: "normal", color: "grey", fontSize: "10px", fontWeight: 400, margin: 0}}>
          x
        </p>
      </button>
    </div>
  )
}

export default InputTag;