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

var TitleField = React.createClass({
	render: function(){
		return (
			<div className="form-group">
		  		<label for="title">标题</label>
		  		<input type="text" className="form-control" id="title" value="中文" name="title"
		  		placeholder="标题,请少于200字符"/>
	    		</div>
		);
	}
});

var ContentField = React.createClass({
	render: function(){
		return (
	   		<div className="form-group">
		  		<label for="content">内容</label>
		  		<textarea type="textarea" rows="20" className="form-control" id="content" name="content" placeholder="填写内容,请少于2000字符">中文
				</textarea >
	    	</div>
		);
	}

});

var OverdaysField = React.createClass({
	render: function(){
		return (
	    	<div className="form-group">
		  	<label for="offdays">有效天数</label>
		  	<input type="text" className="form-control" value="15" id="offdays" name="offdays"/>
	    	</div>
		);
	}
});

var InfoForm = React.createClass({
	render:function(){
		return (
			<form role="form" method="post"  action="/info">
			<TitleField />
			<ContentField />
			<OverdaysField />
	    	<input type="submit" className="btn" value="发布" />
	  		</form>

		);
	}

});

var InfoBar = React.createClass({
	render:function(){
		return (
						<div>
		<button  className="btn">添加</button>
		<button  className="btn">修改</button>
						</div>
		)
	}

});
var InfoView = React.createClass({
	render:function(){
		return (
      		<div className="row">
			  	<h1>Title</h1>
        		<p className="col-md-12">
					培训内容：
					1 前端技术：学习在网页上展示内容（例如淘宝网的商品信息），如何在网页上制作小游戏（例如贪吃蛇游戏），如何播放视频（例如优酷视频）
					2 后端技术：学习搭建服务器处理网页的请求（例如处理购物订单），学习如何存储查询海量的数据（例如查询淘宝商品）
					涉及技术 ：
					HTML+CSS网页技术，javascript编程语言，Nodejs服务器平台，mysql数据库，HTTP网络协议，面向对象编程思想，数据库数据关系的设计
					面向人群 ：
					计算机专业学生，对编程技术有浓厚兴趣者
        		</p>
				<div><i>2016-11-01</i></div>
      		</div>
		);
	}

});


ReactDOM.render(<Search />, document.getElementById('header'));
ReactDOM.render(<InfoForm />, document.getElementById('addinfo'));
ReactDOM.render(<div><InfoBar /><InfoView /></div>, document.getElementById('showinfo'));

