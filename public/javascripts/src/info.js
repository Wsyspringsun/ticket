var Search = React.createClass( {
	render: function(){
		return (
			<div className = "container">
		   	<form style = {{margin: "40px 0 0 0"}} role = "form" >
		   		<input type = "text" placeholder = "关键字" style = {{float:"left"}} className = "form-control" />
	   			<button type = "submit" className = "btn" > 搜索 </button>
        	</form >
		   	</div>
    	);
  	}
});

var InfoForm = React.createClass({
	handleSubmit:function(e){
		e.preventDefault();
		var title = this.refs.title.value.trim();
		var content = this.refs.content.value.trim();
		var offdays = this.refs.offdays.value.trim();

		if(title =='' || content =='' || offdays =='' ){
			return;	
		}
		this.props.onInfoSubmit({
			title:title,
			content:content,
			offdays:offdays
		});
		this.refs.title.value = '';
		this.refs.content.value = '';
		this.refs.offdays.value = '';

	},
	render:function(){
		return (
			<form role="form" onSubmit={this.handleSubmit}>
			<div className="form-group">
		  		<label htmlFor="title">标题</label>
		  		<input type="text" className="form-control" defaultValue="中文" ref="title"
		  		placeholder="标题,请少于200字符"/>
	    	</div>

	   		<div className="form-group">
		  		<label htmlFor="content">内容</label>
		  		<textarea type="textarea" rows="20" className="form-control" id="content" ref="content" placeholder="填写内容,请少于2000字符" >
				</textarea >
	    	</div>

	    	<div className="form-group">
		  		<label htmlFor="offdays">有效天数</label>
		  		<input type="text" className="form-control" defaultValue="15" id="offdays" ref="offdays"/>
	    	</div>
	    	<input type="submit" className="btn" value="发布" />
	  		</form>

		);
	}

});

var InfoBar = React.createClass({
	handleModify:function(e){
		
	},
	handlerDel:function(e){
		
	},
	render:function(){
		return (
			<div>
				<button onClick={this.handleModify}  className="btn">修改</button>
				<button onClick={this.handlerDel} className="btn">删除</button>
			</div>
		)
	}

});
var InfoView = React.createClass({
	render:function(){
		return (
      		<div className="row">
			  	<h1>{this.props.info.title}</h1>
        		<p className="col-md-12">
					{this.props.info.content}
        		</p>
				<div><i>{this.props.info.createDate}-{this.props.info.overDate}</i></div>
      		</div>
		);
	}

});


var InfoBox = React.createClass({
	getInitialState:function(){
		return {data:{}};
	},
	handleInfoSubmit:function(info){
		var me = this;	
		$.post(this.props.url,info,function(result){
			console.log(result);
			if(!result)
				throw Error("server err:no result ;");
			if(!result.ok){
				alert("服务器维护中...");
				return;
			}

			me.setState(result);
		});
	},
	render:function(){
		return (
			<div className="container" id="infoBox">
				<InfoForm onInfoSubmit={this.handleInfoSubmit}/>
				<InfoBar />
				<InfoView info={this.state.data}/>
			</div>
		)
	}
})
ReactDOM.render(<Search />, document.getElementById('header'));
ReactDOM.render(<InfoBox url="/info"/>, document.getElementById('infoBox'));

