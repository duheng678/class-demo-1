var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    //绑定事件
    init() {
        this.updateTab();
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.add.onclick = this.addTab;
            this.removes[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
        }
    }
    //重新加载
    updateTab() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.removes = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    //清除类名
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //1.切换Tab栏
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    //2.添加Tab栏
    addTab() {
        that.clearClass();
        var random = Math.random();
        var li =
            ' <li class="liactive"><span>新卡</span><span class="iconfont icon-guanbi"></span></li>';
        var sec = '<section class="conactive">测试1' + random + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', sec);
        that.init();
    }
    //3.删除Tba栏
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.index;
        this.parentNode.remove();
        that.sections[index].remove();
        that.init();
        index--;
        if (document.querySelector('.liactive')) return;
        that.lis[index] && that.lis[index].click();
    }
    //4.编辑Tab栏
    editTab() {
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type= "text"/>';
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        };
    }
}
new Tab('#tab');
