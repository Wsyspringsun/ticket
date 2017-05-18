var Game = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d') ;
		var width = canvas.width,
    height = canvas.height;
    var bWidth = 10,
    bHeight = 10;
		//重绘屏幕
    var interval1 = null;
    var score = 0,
    speed = 1000;
    var apple = null,
    player = null;
		//自动移动蛇
    var interval2 = null;
    drawBorder();
    function start() {
        score = 0;
        speed = 1000;
        //显示分数
        apple = new Apple(22, 25);
        apple.move();
        apple.show();
        player = new Snake();

        interval1 = setInterval(function() {
            drawBorder();
            drawScore(score);
            player.show();
            apple.show();
        },
        20);

        automove(speed);
        //监听键盘事件
        $('body').keydown(function(event) {
            var map = {
                37 : 'left',
                38 : 'top',
                39 : 'right',
                40 : 'bottom'
            };
            player.move(map[event.keyCode]);
        });
        $('#start').hide();
    }
    function drawScore(score) {
        ctx.fillStyle = "black";
        ctx.font = "20px Couriers";
        ctx.textBaseline = 'top';
        ctx.fillText('得分:' + score, bWidth * 2, bHeight * 2);
    }
    //创建块对象
    function Block(rIdx, cIdx) {
        this.row = rIdx;
        this.col = cIdx;
        this.width = bWidth;
        this.x = this.col * this.width;
        this.y = this.row * this.width;
    }
    Block.prototype = {
        constructor: Block,
        drawRect: function(style) {
            if (!style) style = "#fc0000";
            ctx.fillStyle = style;
            ctx.fillRect(this.x, this.y, this.width, this.width);
        },
        drawCircle: function(r) {
						if(!r) r = this.width / 2 + 5;
            ctx.fillStyle = "#00ff00";
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.width / 2, r, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        }
    }
    //出界检测
    function checkOutBorder(block) {
        if (block.x < 0 || block.x >= width){
				    return true;
				} 
        if (block.y < 0 || block.y >= height) return true;

    }
    //碰撞检测
    function checkCollide(b1, b2) {
        if (! (b1 instanceof Block)) {
            return;
        }

        if (! (b2 instanceof Block)) return;
        //console.log(b1.x+'/'+b2.x+';'+b1.y+'/'+b2.y);
        return b1.x == b2.x && b1.y == b2.y;
    }
    //Game Over
    function gameover() {
        clearInterval(interval1);
        clearInterval(interval2);
        drawBorder();
        player.drawDeadSnake();
        ctx.fillStyle = "red";
        ctx.font = "40px Couriers";
        ctx.textBaseline = 'center';
        ctx.fillText('Game Over', width / 4, height / 2);

        $('body').unbind('keydown');
        $('#score').val(score + '');
        $('#start').show();
    }
    //画蛇
    function Snake() {
        this.blocks = [],
        this.direction = 'left';
        for (var i = 0; i < 5; i++) {
            var b = new Block(20, 18 + i);
            this.blocks.push(b);
        }
    }
    Snake.prototype = {
        constructor: Snake,
        move: function(direction) {
            var head = this.blocks[0];
            var reverse = {
                'left': 'right',
                'top': 'bottom',
                'right': 'left',
                'bottom': 'top'
            };
            if (reverse[direction] == this.direction) return;
            if (direction) this.direction = direction;
            var newhead = null;
            switch (this.direction) {
            case 'left':
                var row = head.row,
                col = head.col - 1;
                newhead = new Block(row, col);
                break;
            case 'top':
                var row = head.row - 1,
                col = head.col;
                newhead = new Block(row, col);
                break;
            case 'right':
                var row = head.row,
                col = head.col + 1;
                newhead = new Block(row, col);
                break;
            case 'bottom':
                var row = head.row + 1,
                col = head.col;
                newhead = new Block(row, col);
                break;
            }

            //出了边界
            if (checkOutBorder(newhead)) {
                gameover();
                return;
            }
            //碰到自己
            for (i = 1; i < this.blocks.length; i++) {
                if (checkCollide(newhead, this.blocks[i])) {
                    gameover();
                    return;
                }
            }

            //判断是否吃到苹果,
            if (!checkCollide(newhead, apple.block)) {
                //如果没有吃到苹果则删掉尾部
                this.blocks.pop();
            } else {
                //吃到了苹果,不删除尾部并且移动苹果位置
                apple.move();
                score++;
                //分数增加10分自动移动的速度就要加快100ms
                if (score % 10 == 0) {
                    speed -= 100;
                    //最块的速度不能小于100ms
                    if (speed <= 100) speed = 100;
                    automove(speed);
                }
            }
            this.blocks.unshift(newhead);
        },
        show: function() {
            for (var i = 0; i < this.blocks.length; i++) {
                var b = this.blocks[i];
                if (b) b.drawRect();
            }
        },
				drawDeadSnake: function (){
            for (var i = 0; i < this.blocks.length; i++) {
                var b = this.blocks[i];
                if (b) b.drawCircle(5);
            }
				}
    }
    //画苹果
    function Apple() {
        this.block = null;
    }
    Apple.prototype = {
        constructor: Apple,
        move: function() {
            var row = Math.floor(Math.random() * width / bWidth - 1);
            var col = Math.floor(Math.random() * height / bWidth - 1);
            if (row <= 0) row = 2;
            if (col <= 0) col = 2;
            this.block = new Block(row, col);
        },
        show: function() {
            if (!this.block) return;
            this.block.drawCircle();
        }
    }
    //蛇自动移动
    function automove(speed) {
        if (interval2 != null) clearInterval(interval2);
        //用指定的间隔时间执行蛇自动移动的方法
        interval2 = setInterval(function() {
            player.move();
        },
        speed);
    }
    //画边框
    function drawBorder() {
        //ctx.fillStyle = "#000000";
        //ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width , height);
    }

    start();
}
