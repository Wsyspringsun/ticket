var Search = React.createClass( {
	render: function(){
		return (
			<div className = "container">
		   	<form style = {{margin: "40px 0 0 0"}} role = "form" >
		   		<input type = "text" placeholder = "关键字" style = {{float:"left"}} />
	   			<button type = "submit" className = "btn" > 搜索 </button>
        	</form >
		   	</div>
    	);
  	}
});

var BtnBack = React.createClass({
	handleClick:function(e){
		this.props.doBack(e);
	},
	render:function(){
		return (
		<button type="button" className="btn btn-default btn-lg float-left" onClick={this.handleClick}>
		<span className="glyphicon glyphicon-chevron-left"></span> 
		</button>
		);
	}
});


