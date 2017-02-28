var SYS_ERR = '服务器维护中...';
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

var InfoForm = React.createClass({
	handleSubmit:function(e){
		e.preventDefault();
		var title = this.refs.title.value.trim();
		var content = this.refs.content.value.trim();
		var offdays = this.refs.offdays.value.trim();

		if(title =='' || content =='' || offdays =='' ){
			return;	
		}
		this.props.onSubmit({
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
		  		<input type="text" className="form-control" defaultValue={ this.props.editInfo?this.props.editInfo.title: "中文" } ref="title"
		  		placeholder="标题,请少于200字符"/>
	    	</div>

	   		<div className="form-group">
		  		<label htmlFor="content">内容</label>
		  		<textarea type="textarea" rows="20" className="form-control" defaultValue={ this.props.editInfo?this.props.editInfo.content: "" } id="content" ref="content" placeholder="填写内容,请少于2000字符" >
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
	handleComplete:function(e){
		this.props.doComplete();
	},
	handleModify:function(e){
		this.props.doEdit(this.props.curInfo);
	},
	handlerDel:function(e){
		this.props.doDel(this.props.curInfo);
	},
	render:function(){
		return (
			<div className="btn-group">
				<button onClick={this.handleComplete}  className="btn">完成</button>
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


var InfoList = React.createClass({
	handleItemClick:function(i,proxy,n,e){
		e.preventDefault();
		this.props.viewInfo(this.props.infos[i]);
	},
	render:function(){
		var data = this.props.infos;
		var html = <h2>没有任何数据！</h2>;
		if(data && data.length>0){
			html =  (
				<table className="table table-striped">
					<thead>
						<tr>
							<th>序号</th>
							<th>标题</th>
							<th>有效日期</th>
						</tr>
					</thead>
					<tbody>
					{
							data.map(function(info,i){
								return (
									<tr key={i} className={i%2==0 ? "info":""}>
									<td>{i + 1}</td>
									<td><a href="javascript:void(0)" onClick={ this.handleItemClick.bind(this,i) } className="info-item">{info.title}</a></td>
									<td><i>{info.createDate}</i></td>
									</tr>
								);
							},this)
					}
					</tbody>
				</table>
	
			);
		}
		return (
			<div>
				{html}
			</div>
		);
	}
});

var InfoGrid = React.createClass({
	handleItemClick:function(i,proxy,n,e){
		e.preventDefault();
		this.props.viewInfo(this.props.infos[i]);
	},
	handleEditItemClick:function(i,proxy,n,e){
		e.preventDefault();
		this.props.editInfo(this.props.infos[i]);
	},
	handleDelItemClick:function(i,proxy,n,e){
		e.preventDefault();
		this.props.delInfo(this.props.infos[i]);
	},
	render:function(){
		var data = this.props.infos;
		var html = <h2>没有任何数据！</h2>;
		if(data && data.length>0){
			html =  (
				<table className="table table-striped">
					<thead>
						<tr>
							<th>序号</th>
							<th>标题</th>
							<th>有效日期</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
					{
							data.map(function(info,i){
								return (
									<tr key={i} className={i%2==0 ? "info":""}>
									<td>{i + 1}</td>
									<td><a href="javascript:void(0)" onClick={ this.handleItemClick.bind(this,i) } className="info-item">{info.title}</a></td>
									<td><i>{info.createDate}</i></td>
									<td>
									<div className="btn-group">
										<button className="btn btn-link" type="button" onClick={ this.handleEditItemClick.bind(this,i) }>修改</button>
										<button className="btn btn-link" type="button"onClick={ this.handleDelItemClick.bind(this,i) }>删除</button>
									</div>
									</td>
									</tr>
								);
							},this)
					}
					</tbody>
				</table>
	
			);
		}
		return (
			<div>
				<button className="btn" onClick={this.props.addInfo}>{'添加'}</button>
				{html}
			</div>
		);
	}
});

var InfoState = {};
InfoState.CREATE='c';
InfoState.LIST='l';
InfoState.EDIT='e';
InfoState.VIEW='v';

var InfoBox = React.createClass({
	getInitialState:function(){
		return {
			stat:InfoState.LIST,
			infos:[]
		};
	},
	componentDidMount: function(){
		this.readInfos();
	},
	toAdd:function(e){
		this.state.stat = InfoState.CREATE;
		this.setState(this.state);
	},
	toView: function(info){
		this.state.curInfo = info;
		this.state.stat = InfoState.VIEW;
		this.setState(this.state);
	},
	toList: function(){
		this.state.stat = InfoState.LIST;
		this.setState(this.state);
	},
	toEdit: function(info){
		this.state.curInfo = info;
		this.state.stat = InfoState.EDIT;
		this.setState(this.state);
	},
	createInfo:function(info){
		$.post(this.props.url,info,function(result){
			if(!result || !result.ok){
				alert(window.SYS_ERR);
				return;
			}
			var info = result.data;
			if(!this.state.infos ||  this.state.infos.length<=0){
				this.state.infos = [];
			}

			this.state.infos.unshift(info);
			this.toView(info);
		}.bind(this));
	},
	readInfos:function(){
		$.get('/info/read',function(result){
			if(!result || !result.ok){
				alert(window.SYS_ERR);
				return;
			}

			this.state.infos = result.data;
			this.toList();
		}.bind(this));
	},
	updateInfo:function(info){
		var url = "/info/"+this.state.curInfo.id;
		$.post(url,info,function(result){
			if(!result || !result.ok){
				alert(window.SYS_ERR);
				return;
			}
			var info = result.data;

			if(!this.state.infos ||  this.state.infos.length<=0){
				this.state.infos = [];
			}
			var infos = this.state.infos.map(function(item){
				if(item.id == info.id){
					return info;
				}else{
					return item;		
				}	
			});
			this.state.infos = infos;

			this.toView(info);
		}.bind(this));
	},
	delInfo: function(info){
		if(!info)
			return;
		var id = info.id;
		if(!id)
			return;
		$.get('/info/'+id,function(result){
			if(!result || !result.ok){
				alert(window.SYS_ERR);
				return;
			}
			var infos = this.state.infos.filter(function(item){
				return item.id != id;
			});
			this.state.infos = infos;
			this.setState(this.state);
		}.bind(this));
	},
	render:function(){
		var stat = this.state.stat;
		switch(stat){
			case InfoState.CREATE:
				return (<div>
						<button onClick={this.toList} className="btn" >取消</button>
						<InfoForm onSubmit={this.createInfo} />
						</div>);
				break;
			case InfoState.EDIT:
				return  ( <div>
						<button onClick={this.toList} className="btn" >取消</button>
						<InfoForm onSubmit={this.updateInfo} editInfo={this.state.curInfo} />
						</div>);

				break;
			case InfoState.VIEW:
				return <div><InfoBar curInfo={this.state.curInfo} doEdit={this.toEdit} doDel={this.delInfo} doComplete={this.toList}/><InfoView info={this.state.curInfo}/></div>;
				break;
			default:
				return <InfoList infos = {this.state.infos} addInfo = {this.toAdd} viewInfo = {this.toView} editInfo={this.toEdit} delInfo={this.delInfo}/>;
				break;
		}
	}

});


		ReactDOM.render(<InfoList />, document.getElementById('infoBox'));
