import APP from '../App';
import '../App.css';

function Header(props){
    return <header className="App-header">
      <h1><a href='/' onClick={(event)=>{
        event.preventDefault();//a태크 기본동작을 방지해준다. 클릭해도 재 로딩을 안한다는 뜻
        props.onchangeMode();
      }}>{props.title}</a></h1>
    </header>
  }

  export default Header;