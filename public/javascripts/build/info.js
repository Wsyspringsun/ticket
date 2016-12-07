var Search = React.createClass( {displayName: "Search",
	render: function(){
		return (
			React.createElement("div", {className: "container"}, 
		   	React.createElement("form", {style: {margin: "40px 0 0 0"}, role: "form"}, 
		   		React.createElement("input", {type: "text", placeholder: "关键字", style: {float:"left"}, className: "form-control"}), 
	   			React.createElement("button", {type: "submit", className: "btn"}, " 搜索 ")
        	)
		   	)
    	);
  	}
});

var InfoForm = React.createClass({displayName: "InfoForm",
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
			React.createElement("form", {role: "form", onSubmit: this.handleSubmit}, 
			React.createElement("div", {className: "form-group"}, 
		  		React.createElement("label", {htmlFor: "title"}, "标题"), 
		  		React.createElement("input", {type: "text", className: "form-control", defaultValue: "中文", ref: "title", 
		  		placeholder: "标题,请少于200字符"})
	    	), 

	   		React.createElement("div", {className: "form-group"}, 
		  		React.createElement("label", {htmlFor: "content"}, "内容"), 
		  		React.createElement("textarea", {type: "textarea", rows: "20", className: "form-control", id: "content", ref: "content", placeholder: "填写内容,请少于2000字符"}
				)
	    	), 

	    	React.createElement("div", {className: "form-group"}, 
		  		React.createElement("label", {htmlFor: "offdays"}, "有效天数"), 
		  		React.createElement("input", {type: "text", className: "form-control", defaultValue: "15", id: "offdays", ref: "offdays"})
	    	), 
	    	React.createElement("input", {type: "submit", className: "btn", value: "发布"})
	  		)

		);
	}

});

var InfoBar = React.createClass({displayName: "InfoBar",
	handleModify:function(e){
		
	},
	handlerDel:function(e){
		
	},
	render:function(){
		return (
			React.createElement("div", null, 
				React.createElement("button", {onClick: this.handleModify, className: "btn"}, "修改"), 
				React.createElement("button", {onClick: this.handlerDel, className: "btn"}, "删除")
			)
		)
	}

});
var InfoView = React.createClass({displayName: "InfoView",
	render:function(){
		return (
      		React.createElement("div", {className: "row"}, 
			  	React.createElement("h1", null, this.props.info.title), 
        		React.createElement("p", {className: "col-md-12"}, 
					this.props.info.content
        		), 
				React.createElement("div", null, React.createElement("i", null, this.props.info.createDate, "-", this.props.info.overDate))
      		)
		);
	}

});


var InfoBox = React.createClass({displayName: "InfoBox",
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
			React.createElement("div", {className: "container", id: "infoBox"}, 
				React.createElement(InfoForm, {onInfoSubmit: this.handleInfoSubmit}), 
				React.createElement(InfoBar, null), 
				React.createElement(InfoView, {info: this.state.data})
			)
		)
	}
})
ReactDOM.render(React.createElement(Search, null), document.getElementById('header'));
ReactDOM.render(React.createElement(InfoBox, {url: "/info"}), document.getElementById('infoBox'));

