import React, { Component } from 'react';
import './Bill.css';
import Suggestion from "./Suggestion"


class Bill extends Component {
  constructor(){
    super();
    this.state={
      list: [],
      lpage:"true",
      GST:"",
      Name:"",
      Price:"",
      Code:""
    }
  }
  onClick=()=>{
    this.setState({lpage:"false"})
  }

  onDelete=(data)=>{
     fetch("http://localhost:3005/",{
   method: "delete",
   headers: {"Content-type":"application/json"},
   body:JSON.stringify({product_name:data.product_name})  
   })
     alert("data was removed")

   }  
   
    componentDidUpdate=()=>{ 
    setTimeout(function() {console.log("update")
     fetch("http://localhost:3005/")
     .then(res=>{return res.json()})
     .then(resresult=>{this.setState({list:resresult})}) 
     
     }.bind(this), 1000);
    }
    componentDidMount=()=>{

     fetch("http://localhost:3005/")
      .then(res=>{return res.json()})
     .then(resresult=>{this.setState({list:resresult})}) 
     
   

  }
  
 onName=(event)=>{
    this.setState({Name:event.target.value})
  }

 onCode=(event)=>{
    this.setState({Code:event.target.value})
  }
      
 onPrice=(event)=>{
    this.setState({Price:event.target.value})
  }
  
  onGST=(event)=>{
     this.setState({GST:event.target.value})
  }
  
  up=()=>{
     fetch("http://localhost:3005/")
     .then(res=>{return res.json()})
     .then(resresult=>{this.setState({list:resresult})}) 
  }
  

  onAdd=()=>{
    const SD=this.state
    if(SD.Name!=="" && SD.Code!=="" && SD.Price!==""&& SD.GST!==""){ 
     fetch("http://localhost:3005/",{
   method: "post",
   headers: {"Content-type":"application/json"},
   body:JSON.stringify({
   product_name:SD.Name,
   product_price:SD.Price,
   product_code:SD.Code,
   product_gst:SD.GST
   })
   })
   alert ("data was added ")
   this.up(); 
   }
   else{alert("Enter all the values")}
      this.setState({
        GST:"",
        Code:"",
        Price:"",
        Name:""     
     }) 
    
 } 
 onClick1=()=>{
  this.setState({lpage:"true"})
 }

  render() {
    if(this.state.lpage!=="false"){return (
      <div className="absolute">
      <h3 onClick={this.onClick} className="link tr hover-light-red pointer ttc black pr3">product list</h3> 
         
      <div className="pt2">
      <Suggestion/>  
      </div>
      </div>
    );}
      else
        {return(
        <div className="absolute pa5" >
        <h3 onClick={this.onClick1} className="link tr hover-light-red pointer ttc black pr3">Bill</h3> 
        <div className="overflow-auto">
        <table className="f6 w-100 mw7 center" cellSpacing="0">
        <thead>
        <tr className="stripe-dark ">
        <th className="fw6 tl ph5 bg-white">Code</th>
        <th className="fw6 tl ph5 bg-white">Product</th>
        <th className="fw6 tl ph5 bg-white">Rate(/unit)</th>
        <th className="fw6 tl ph5 bg-white">GST (%)</th>
        <th className="fw6 tl ph5 bg-white"></th>
        </tr>
        </thead>
        <tbody className="lh-copy">
        {this.state.list.map((d,i)=> {return <tr className="stripe-dark" key={this.state.list._id} >
        <td className="ph5 pv2">{this.state.list[i].product_code}</td>
        <td className="ph5 pv2">{this.state.list[i].product_name}</td>
        <td className="ph5 pv2">{this.state.list[i].product_price}</td>
        <td className="ph5 pv2">{this.state.list[i].product_gst}</td>
        <td className="ph5 pv2"><a className="f6 link dim br2 ph1 pv1 mb1 dib white bg-mid-gray" onClick={()=>this.onDelete(this.state.list[i])} >delete</a></td>
        </tr>
        })}
        </tbody>
        </table>
        </div>
        <input type="text" id="field" placeholder="Code" onChange={this.onCode}  value={this.state.Code} />
        <input type="text"   placeholder="Product" onChange={this.onName}  value={this.state.Name} />
        <input type="number"  min="0"  placeholder="Price" onChange={this.onPrice}  value={this.state.Price} />
        <input type="number"  min="0" placeholder="GST" onChange={this.onGST}  value={this.state.GST} />
        <a className="f6 link dim br2 ph4 pv1 mb1 dib white bg-red" onClick={this.onAdd} >Add</a>
        </div>
          );}
    
  }
}

export default Bill;


