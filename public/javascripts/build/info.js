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

var TitleField = React.createClass({displayName: "TitleField",
	render: function(){
		return (
			React.createElement("div", {className: "form-group"}, 
		  		React.createElement("label", {for: "title"}, "标题"), 
		  		React.createElement("input", {type: "text", className: "form-control", id: "title", value: "中文", name: "title", 
		  		placeholder: "标题,请少于200字符"})
	    		)
		);
	}
});

var ContentField = React.createClass({displayName: "ContentField",
	render: function(){
		return (
	   		React.createElement("div", {className: "form-group"}, 
		  		React.createElement("label", {for: "content"}, "内容"), 
		  		React.createElement("textarea", {type: "textarea", rows: "20", className: "form-control", id: "content", name: "content", placeholder: "填写内容,请少于2000字符"}, "中文"
				)
	    	)
		);
	}

});

var OverdaysField = React.createClass({displayName: "OverdaysField",
	render: function(){
		return (
	    	React.createElement("div", {className: "form-group"}, 
		  	React.createElement("label", {for: "offdays"}, "有效天数"), 
		  	React.createElement("input", {type: "text", className: "form-control", value: "15", id: "offdays", name: "offdays"})
	    	)
		);
	}
});

var InfoForm = React.createClass({displayName: "InfoForm",
	handleSubmit:function(e){
		e.preventDefault();
	},
	render:function(){
		return (
			React.createElement("form", {role: "form", method: "post", action: "/info", onSubmit: this.handleSubmit}, 
			React.createElement(TitleField, null), 
			React.createElement(ContentField, null), 
			React.createElement(OverdaysField, null), 
	    	React.createElement("input", {type: "submit", className: "btn", value: "发布"})
	  		)

		);
	}

});

var InfoBar = React.createClass({displayName: "InfoBar",
	render:function(){
		return (
						React.createElement("div", null, 
		React.createElement("button", {className: "btn"}, "添加"), 
		React.createElement("button", {className: "btn"}, "修改")
						)
		)
	}

});
var InfoView = React.createClass({displayName: "InfoView",
	render:function(){
		return (
      		React.createElement("div", {className: "row"}, 
			  	React.createElement("h1", null, "Title"), 
        		React.createElement("p", {className: "col-md-12"}, 
					"培训内容：" + ' ' +
					"1 前端技术：学习在网页上展示内容（例如淘宝网的商品信息），如何在网页上制作小游戏（例如贪吃蛇游戏），如何播放视频（例如优酷视频）" + ' ' +
					"2 后端技术：学习搭建服务器处理网页的请求（例如处理购物订单），学习如何存储查询海量的数据（例如查询淘宝商品）" + ' ' +
					"涉及技术 ：" + ' ' +
					"HTML+CSS网页技术，javascript编程语言，Nodejs服务器平台，mysql数据库，HTTP网络协议，面向对象编程思想，数据库数据关系的设计" + ' ' +
					"面向人群 ：" + ' ' +
					"计算机专业学生，对编程技术有浓厚兴趣者"
        		), 
				React.createElement("div", null, React.createElement("i", null, "2016-11-01"))
      		)
		);
	}

});


ReactDOM.render(React.createElement(Search, null), document.getElementById('header'));
ReactDOM.render(React.createElement(InfoForm, null), document.getElementById('addinfo'));
ReactDOM.render(React.createElement("div", null, React.createElement(InfoBar, null), React.createElement(InfoView, null)), document.getElementById('showinfo'));

