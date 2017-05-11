/** WebBox  bar**/
var WebInfoGrid = React.createClass({
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

var WebBox = React.createClass({
	getInitialState: function(){
		return {
			stat:InfoState.LIST,
			infos:[]
		};
	},
	componentDidMount: function(){
		this.readInfos();
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
	readInfos:function(){
//		$.get('/info/read',function(result){
//			if(!result || !result.ok){
//				alert(window.SYS_ERR);
//				return;
//			}
//
//			this.state.infos = result.data;
//			this.toList();
//		}.bind(this));
	},
	render:function(){
		var stat = this.state.stat;
		switch(stat){
			case InfoState.VIEW:
				return (
				<div>
					<BtnBack doBack={this.toList} />
					<InfoView info={this.state.curInfo}/>
				</div>
				);
				break;
			default:
				return <WebInfoGrid infos = {this.state.infos}  viewInfo = {this.toView} />;
				break;
		}
	}

});
/** end WebBox  bar**/

