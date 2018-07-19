import Autosuggest from 'react-autosuggest';
import React from 'react';
import "./Suggestion.css"
var vlist ;

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : vlist.filter(lang =>
    lang.product_name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.product_name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.product_name}
  </div>
);

class Suggestion extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      list:[],
      blist:[],
      bunit:[],
      bcost:[],
      total:0,
    };
  }
  async componentDidMount(){
     const res= await fetch("http://localhost:3005/")
     const resresult= await res.json()
     this.setState({list:resresult})
     vlist=this.state.list;
  }

  onChange = (event, { newValue,method }) => {
    this.setState({
      value: newValue
    });

  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });

  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onClick=()=>{
    if(this.state.value!=="" && this.state.unit!=="") {console.log(this.state.value)}
      else {alert("enter all the values")};
    const t=  vlist.filter(lang =>
   lang.product_name === this.state.value
  );
   this.state.blist.push(t[0]);
   this.state.bunit.push(this.state.unit); 
   var cost = ((t[0].product_price*this.state.unit)+((t[0].product_price*this.state.unit)*(t[0].product_gst/100)));
   this.state.bcost.push(cost)
   this.setState({total:(cost+this.state.total)});
   this.forceUpdate();
  }

  onNumb=(event)=>{
   this.setState({unit:event.target.value}) 
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Product name',
      value,
      onChange: this.onChange
    };

   

    // Finally, render it!
    return (
      <div>
      <div className="overflow-auto">
        <table className="f6 w-100 mw7 center" cellSpacing="0">
        <thead>
        <tr className="stripe-dark ">
        <th className="fw6 tl ph5 bg-white">Code</th>
        <th className="fw6 tl ph5 bg-white">Product</th>
        <th className="fw6 tl ph5 bg-white">Rate(/unit)</th>
        <th className="fw6 tl ph5 bg-white">Units</th>
        <th className="fw6 tl ph5 bg-white">GST (%)</th>
        <th className="fw6 tl ph5 bg-white">Cost(Rs.)</th>
        </tr>
        </thead>
        <tbody className="lh-copy">
        {this.state.blist.map((d,i)=> {return <tr className="stripe-dark" key={this.state.list._id} >
        <td className="ph5 pv2">{this.state.blist[i].product_code}</td>
        <td className="ph5 pv2">{this.state.blist[i].product_name}</td>
        <td className="ph5 pv2">{this.state.blist[i].product_price}</td>
        <td className="ph5 pv2">{this.state.bunit[i] }</td>
        <td className="ph5 pv2">{this.state.blist[i].product_gst}</td>
        <td className="ph5 pv2">{this.state.bcost[i]}</td>
        </tr>
        })}
        </tbody>
        </table>
        </div>
        <div className="pt5">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      </div>
      <div className="pl7">
      <input type="number" className="Numberinput" placeholder="units" onChange={this.onNumb} min="1"/>
      <a className="f6 link dim br2 ph3 pv2 mb2 dib white bg-mid-gray" onClick={this.onClick} >ADD</a>
      </div>
      <h2 className="tr pr5">Total:{this.state.total}</h2>
      </div>
    );
  }
}

export default Suggestion;