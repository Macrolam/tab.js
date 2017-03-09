(function(window) {
    var Tab = function(options) {
        this.init(options);
    };

    Tab.prototype = {
        // constructor: Tab,
        init: function(options) {
            initElements.call(this, options);
            initEvents.call(this);

            if(this.auto === true) {
                this.autoPlay();
            }
        },
        change: function(obj) {
            var tabMain = this.tabMain,
                tabMenus = this.tabMenus,
                tabMLen = tabMenus.length;
            for(var i=0; i < tabMLen; i++) {
                // 清除所有按钮样式
                tabMenus[i].className = "tab-item";
                // 隐藏所有div
                tabMain[i].style.display = "none";
            }

            obj.className += " active";
            tabMain[obj.index].style.display = "block";
        },
        autoPlay: function() {
            var index = -1,
                self = this,
                play = function() {
                    index++;
                    if(index > 3) {
                        index = 0;
                    }
                    self.change(self.tabMenus[index]);
                };

            play();
            setInterval(play,this.tempStep || 1000);
        }
    };

    var $id = function(idStr) {
        return document.getElementById(idStr);
    };
    var initElements = function(options) {
        // 初始化元素
        // this.container = id(options.container);
        this.tabMenus = $id(options.tabMenu).children;
        this.tabMain = $id(options.tabMain).children;
        this.auto = options.auto;
        this.tempStep = options.tempStep;
    };

    var initEvents = function() {
        var self = this,
            tabMenus = this.tabMenus,
            tabMLen = tabMenus.length;
        for(var i=0; i < tabMLen; i++) {
            // 初始化索引号
            tabMenus[i].index = i;
            // 初始化单击事件
            tabMenus[i].onclick = function() {
                self.change( this );
            };
        }
    };

    // 对外开放
    window.Tab = Tab;
})(window);
