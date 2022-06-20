import APP from '../App';

function Nav(props){
    const lis = []
    for(let i=0; i<props.topics.length; i++){
      let t = props.topics[i];
      lis.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();//페이지 리로드되지 않도록 해준다.
        props.onchangeMode(event.target.id);//A태크가 이벤트해주는 주최 그안 id지정해주기
      }}>{t.title}</a></li>)
    }
    return <nav>
        <ol>{lis}</ol>
      </nav>
  }

  export default Nav;