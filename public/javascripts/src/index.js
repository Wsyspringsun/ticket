var SYS_ERR = '服务器维护中...';
var InfoState = {};
InfoState.CREATE='c';
InfoState.LIST='l';
InfoState.EDIT='e';
InfoState.VIEW='v';

Date.format = function(val,sFormat,format){
//2016-12-26T16:00:00.000Z
	if(!sFormat)
		sFormat = 'YYYY-MM-DDTHH:MI:SS.MSSZ';
	if(!format)
		format = 'YYYY-MM-DD';
	
	if(val && typeof val  === 'string'){
		return val.substr(0,4) + '-' + val.substr(5,2) + '-' + val.substr(8,2);
	}
	return "";
}

var App = React.createClass({
	getInitialState: function(){
		return {stat:'0'};
	},
	handleLogin:function(username){
		this.state.stat = '1';
		this.state.username = username;
		this.setState(this.state);
	},
	render: function(){
		var stat = this.state.stat;
		return (
		<div>
			<NavBox isLogined = {stat} username = {this.state.username} handleLogin = {this.handleLogin}/>
			<div className="container wrapper">
				<WebBox isLogined = {stat}  />
				<XBox isLogined = {stat} />
			</div>
			<div className="footer">
				<p>&copy; 皓鑫有限公司&nbsp;{new Date().getFullYear()} </p>
			</div>
		</div>
		);
	}
});


/** XBox bar**/
var XBox = React.createClass({
	getInitialState:function(){
		return {
			stat:'1',
			msg:''
		};
	},
	closeMask: function(){
		$('#mgrBox').toggle();
	},
	onCmdClick: function(cmd){
		this.state.stat = cmd;
		return function(e){
			this.setState(this.state);
		}.bind(this);
	},
	render: function(){
		var stat = this.state.stat;
		var isLogined = this.props.isLogined;
		var html = null;
//|| isLogined != '1'
		if( false ){
			//没有登录,显示注册界面
			html = <RegistForm />; 
		}else{
			switch(stat){
				case '0':
				html = (
						//功能菜单界面
					<div className="btn-group btn-group-justified">
					  <div className="btn-group">
					    <button type="button" onClick={this.onCmdClick('1')} className="btn btn-success"> 
							信息管理
						</button>
					  </div>
					  <div className="btn-group">
					  </div>
					  <div className="btn-group">
					  </div>
					</div>
				);
				break;
				case '1':
					html = (
					<InfoBox toHome={this.onCmdClick('0')} />
					);
					break;
				case '2':
				default:
					<div>
					<h1>恭喜您-{this.state.member.username} ！注册成功！</h1>
					<LoginForm />
					</div>

					break;
			}
		}
		html = (
			<div className="mask" id="mgrBox">
				<div className="mask-bar"> 
					&nbsp;
					<button className="btn btn-lg mask-btn" onClick={this.closeMask} title="关闭" >
					<span className="glyphicon glyphicon-remove"></span></button>
				</div>
				<div className="mask-main">
				{html}
				</div>
			</div>
		)
		return	html;
	}
});
/** end  XBox bar**/


ReactDOM.render(<App />, document.getElementById('app'));

