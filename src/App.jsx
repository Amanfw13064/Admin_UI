import { useState ,useEffect} from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [page,setpage]=useState(0)
  const [data,setdata2]=useState([])
  const [display,setdisplay]=useState("none")
  const [id,setid]=useState('')
  const [Ename,setEname]=useState("")
  const [Eemail,setEemail]=useState("")
  const [Erole,setErole]=useState("")
  const [checked,setChecked]=useState(false)
  const [search,setSearch]=useState('')
  
useEffect(()=>{
  axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then(({data})=>{
    Pagination(data)
  })
},[page])
const Pagination=(data)=>{
  let p=page*10
  let arr=[]
  for(let i=p;i<p+10;i++){
    let d={
      id:data[i].id,
      name:data[i].name,
      email:data[i].email,
      role:data[i].role,
      checkbox:false
    }
   arr.push(d)
  }
  setdata2(arr)
}
const MakeCheck=(id)=>{
  for(let i=0;i<data.length;i++){
    if(data[i].id==id){
      if(data[i].checkbox==true){
            data[i].checkbox=false
      }else{
        data[i].checkbox=true
      }
    }
  }
  setdata2([...data])
}
const makeEdit=()=>{  
   for(let i=0;i<data.length;i++){
     if(data[i].id==id){
       data[i].name=Ename
       data[i].email=Eemail
       data[i].role=Erole
     }
   }
   setdata2([...data])
   setdisplay('none')
}
const makeDelete=(id)=>{
  console.log(id,"id")
 for(let i=0;i<data.length;i++){
   console.log(data[i].id,"data")
   if(data[i].id==id){
     console.log(data[i])
     data.splice(i,1)
   }
 }
 setdata2([...data])
}
const deleteSelect=()=>{
  for(let i=0;i<data.length;i++){
    if(data[i].checkbox==true){
      data.splice(i,1)
      i--
    }
  }
  setdata2([...data])
}
const makeSerach=(search)=>{
 let filterdata=data.filter((el)=>{
   return el.name==search||el.email==search||el.role==search
 }) 
 setdata2([...filterdata])
}
const selectAll=()=>{
   for(let i=0;i<data.length;i++){
     if(checked==false){
      data[i].checkbox=true
     }else{
      data[i].checkbox=false
     } 
   }
   setdata2([...data])
}
  return (
    <div className="App">
      <input id='search' type="text" onChange={(e)=>{
       setSearch(e.target.value)
      }} placeholder="Search by Name,Email or Role"/><button onClick={()=>{
        makeSerach(search)
      }}>Search</button>
      <table >
        <tr><th onClick={()=>{
          setChecked(!checked)
          selectAll()
        }}> <input type="checkbox" /></th><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        {data.map(e=>{
      return <tr><td><input onClick={()=>{
      MakeCheck(e.id)
      }} type="checkbox" checked={e.checkbox}/></td><td>{e.id}</td><td>{e.name}</td><td>{e.email}</td><td>{e.role}</td><td><button onClick={()=>{
        setEname(e.name)
        setEemail(e.email)
        setErole(e.role)
        setdisplay('block')
        setid(e.id)
      }}>edit</button></td><td><button onClick={()=>{
        makeDelete(e.id)
      }}>delete</button></td></tr>
    })}
      </table>
  <button style={{margin:"10px"}} onClick={()=>{
    deleteSelect()
  }}>Delete Selected One</button>
    <button style={{margin:"10px"}} onClick={()=>{
      if(page!==0){
        setpage(page-1)
      }
    }}>prev</button>
    <button style={{margin:"10px"}} onClick={()=>{
      if(page!==3){
        setpage(page+1)  
      }
    }}>next</button>
    <div id='edit' style={{display:display}}> <button id="close" onClick={()=>{
      setdisplay("none")
    }}>Close</button> Name:<input onChange={(e)=>{setEname(e.target.value)}} type="text" placeholder={Ename}/><br/>
    Email:<input onChange={(e)=>{setEemail(e.target.value)}}  type="text" placeholder={Eemail} /><br/>
    Role:<input onChange={(e)=>{setErole(e.target.value)}}  type="text" placeholder={Erole} /><br/>
    <button onClick={()=>{
      makeEdit()
    }}>Edit</button>
    </div>
    </div>
  )
}


export default App
