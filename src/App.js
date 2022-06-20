import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import Header from './components/Header';
import Nav from './components/Nav';
import Article from './components/Article';


function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();//페이지의 리로드를 못하도록 막는다.
      const title = event.target.title.value;
      const body = event.target.body.value;
      //console.log('title: ', title, 'body: ', body)
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='제목'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"/></p>      
    </form>
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();//페이지의 리로드를 못하도록 막는다.
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='제목' value={title} onChange={event => {
        setTitle(event.target.value)
      }}/></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={event => {
        setBody(event.target.value)
      }}></textarea></p>
      <p><input type="submit" value="Update"/></p>      
    </form>
  </article>
  )
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    {id:1, title:'html', body: 'html is...'},
    {id:2, title:'css', body: 'css is...'},
    {id:3, title:'javascript', body: 'javascript is...'}
   ])

  let content = null;
  let contentControl = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"/>
  }
  else if(mode === 'READ'){
    //console.log('read : ', topics);
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === Number(id)){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    //console.log('read title: ', title, 'read body: ', body);
    content = <Article title={title} body={body}/>
    contentControl = <>
      <li className='buttons'><a href='/update' onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li className='buttons'><input type="button" value="Delete" onClick={() => {
        const newTopics= []
        for(let i=0; i<topics.length; i++){
          if(topics[i].id !== Number(id)){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }}></input></li></>
  }
  else if(mode === "CREATE"){
    content = <Create onCreate={(_title, _body) => {
      if(_title === ""){
        return alert("제목을 입력해주세요");
      }
      console.log('nextId: ', nextId, 'title: ', _title, 'body: ', _body)
      const newTopic = {id: nextId, title: _title, body: _body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);

      setMode('READ');//상세화면으로 보여진다.
      setId(nextId);
      setNextId(nextId+1);
    }}/>
  }
  else if(mode === "UPDATE"){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === Number(id)){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    
    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      if(_title === ""){
        return alert("제목을 입력해주세요");
      }
      const newTopics = [...topics]
      const updateTopic = {id: Number(id), title: _title, body: _body}
      //console.log('id: ', id, ' title: ', _title, ' body: ', _body)
      for(let i=0; i<newTopics.length; i++){
        //console.log('d>>: ', newTopics[i].id)
        if(newTopics[i].id === Number(id)){
          newTopics[i] = updateTopic;
          break;
        }
      }
      //console.log('newTopics: ', newTopics);
      setTopics(newTopics);
      setMode('READ');//상세화면으로 보여진다.
    }}/>
  }
  
  return (
    <div className="App">
      <Header title="React 따라하기" onchangeMode={()=>{
        setMode('WELCOME');
        }}/>
      <Nav topics={topics} onchangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
        }}/>
      {content}
      <p></p>
      <li className='buttons'><a href='/create' onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a>
      </li>
      {contentControl}
    </div>
  );
}

export default App;
