/** Navbar   **/
var NavBox = React.createClass({
	getInitialState:function(){
		return {
			stat:'0'
		};
	},
	showXBox: function(){
		$('#mgrBox').toggle();
	},
	render: function() {
		var stat = this.props.isLogined;
		var html = null;
		switch(stat){
			case '1':
				html =(
				<div className="container">
					<div className="navbar-header">
						<a className="navbar-brand" href="/">ipaji.com</a>
					</div>
					<button type="button" className="navbar-right" style={{padding:'10px',marginTop:5}} onClick={this.showXBox}>
					My <span className="glyphicon glyphicon-home"></span>
					</button>

				</div>
				);
				break;
			default:
				html = ( 
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#loginbar" aria-expanded="false" aria-controls="navbar">
					    <span className="sr-only">Toggle navigation</span>
					    <span className="icon-bar"></span>
					    <span className="icon-bar"></span>
					    <span className="icon-bar"></span>
					  </button>
					  <a className="navbar-brand" href="/">ipaji.com</a>
					</div>
					<div className="navbar-collapse collapse navbar-right" style={{width:500}}>
					<LoginForm handleLogin = {this.props.handleLogin} addons = {
						<button  onClick={this.toRegist}  className="btn btn-default">注册</button>
					} />
					</div>
				</div>
				);

				break;
		}
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
					{html}
			</nav>
		);
	}
}) ;

var LoginForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var username = this.refs.username.value.trim();
		var password = this.refs.password.value.trim();

		if (username == '' || password == '') {
			return;
		}

		$.post('/member/login', {
			username: username,
			password: password
		},
		function(result) {
			if(!result.ok){
				switch(result.err){
					case 0:
						alert(SYS_ERR);
						break;
					default:
						alert(result.data);
						break;
				}
			}else{
				this.props.handleLogin(username);
			}
		}.bind(this));

		this.refs.username.value = '';
		this.refs.password.value = '';

	},
	render: function(){
		return (
			<form className="navbar-form " role="form" onSubmit={ this.handleSubmit }>
				<div className="form-group">
					<input type="text" ref="username" placeholder="Email" className="form-control" />
				</div>
				<div className="form-group">
					<input type="password" ref="password" placeholder="Password" className="form-control" />
				</div>
				<button type="submit" className="btn btn-success">登录</button>
				{this.props.addons }
			</form>   
		)
	}
});
var LoginBar = React.createClass({
	getInitialState:function(){
		return {
			stat:'0'
		};
	},
	toInfoBox:function(){
		$('#mgrBox').toggle();
	},
	render: function() {
		var stat = this.state.stat;
		var html = null;
		switch(stat){
			case '1':
				html = <h2 className="navbar-right">{'欢迎您：' + this.state.member.username + '!'}</h2>;
				break;
			default:
				html = ( 
						<div id="loginbar" className="navbar-collapse collapse navbar-right" style={{width:500}}>
						<LoginForm addons = {
						<button  onClick={this.toRegist}  className="btn btn-default">注册</button>
						} />
						</div>
				);

				break;
		}
		return 	html;
	}

});

var RegistForm = React.createClass({
	render: function(){
		return	(<div>
				<h1>注册</h1>
				<form role="form" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">帐号</label>
						<input type="text" ref="username" placeholder="Email"
						className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="password">密码</label>
						<input type="password" ref="password"
						placeholder="Password" className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="password">显示密码&nbsp;&nbsp;
							<input type="checkbox" ref="chkShowPwd" />
						</label>
					</div>
					<button type="submit" className="btn btn-success">提交</button>
				</form>   
			</div>)

	}
});
/** end Nav bar**/

