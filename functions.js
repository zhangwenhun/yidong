//1.解决类名的兼容函数
 //2016.4.28 
 //classname: 所要找的类名
 //father: 通过父元素来找这个类名
 function getClass(classname,father){//兼容函数
    father=father||document;
    //1. 判断浏览器
    if(father.getElementsByClassName){//条件为真时，代表就是FF和chrome
        return father.getElementsByClassName(classname);
    }else{//条件为假时，代表是IE
      //ID  Tag  name
      var all=father.getElementsByTagName("*");//所有的
      /*[<html></html>,<head></head>,<body></body>,<div class="box"></div>,<div class="one">111</div>,<div class="one">222</div>,<div class="one">333</div>]*/
      var newarr=[];
      //遍历数组
      for (var i = 0; i < all.length; i++) {
      	//"one fi".split()["one","fi"]  "one"
      	  //if(all[i].className==classname){//如果条件相等，表示找见了
      	  if(checkRep(all[i].className,classname)){
            newarr.push(all[i]);
      	  }
      };
      return newarr;
    }
   }
  function checkRep(str,classname){//"two one three" "one"  ["two","fi","three"]  判断str与classname是否一样
    var arr=str.split(" ");//以空格做分隔符转换数组
    for(var i in arr){//遍历数组
    	if(arr[i]==classname){//判断元素与classname是否相同，相同时返回true
    		return true;
    	}
    }
    return false;// 所有比较以后，没有找到返回false
  }

//※※※※※※※※※※※※※※※※※※※※※
//2\纯文本的兼容函数
 //2016.5.3
 //obj：对象   val：要设置的内容（纯文字）
 function getText(obj,val){
    //获取功能
    if(val==undefined){
      if(obj.textContent){//火狐
        return obj.textContent;
      }else{//ie
        return obj.innerText;
      }
    }else{
      if(obj.textContent){//火狐
        obj.textContent=val;
      }else{//ie
          obj.innerText=val;
      }
    }
    //设置功能
    
 }

//※※※※※※※※※※※※※※※※※※※※※
//3\获取样式的兼容函数
  //obj:对象
  //attr：属性
  function getStyle(obj,attr){
      if(obj.currentStyle){
        //字符串转换成数值类型
        return parseInt(obj.currentStyle[attr]);
      }else{
        return parseInt(getComputedStyle(obj,null)[attr]);
      }
  }
 
//※※※※※※※※※※※※※※※※※※※※※
//4\获取元素的兼容函数
 //selector:表示选择器，与css的选择器一样
 //father：父容器
 //需要使用父容器时，需提前获取父容器然后再使用
 function $(selector,father){
   //给父容器设置默认值
   father=father||document;
   //对selector做判断
   if(typeof selector=="string"){
      //去除字符串左右的空格
      selector=selector.replace(/^\s*|\s*$/g,"");
      if(selector.charAt(0)=="."){//class名
        return getClass(selector.slice(1),father);
      }else if(selector.charAt(0)=="#"){//id名
        return father.getElementById(selector.slice(1));
      }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){//标签名
        return father.getElementsByTagName(selector);
      }
   }else if(typeof selector=="function"){
    //是一个函数时执行window.onload时间
      window.onload=function(){
        selector();
      }
   }
 }

//※※※※※※※※※※※※※※※※※※※※※
//5、获取子元素的兼容函数
  // 2016.5.6
  function getChild(father,type){
    type=type||"a";
    var all=father.childNodes;
    var arr=[];
    for (var i = 0; i < all.length; i++) {
      if(type=="a"){//只获取元素子节点
          if(all[i].nodeType==1){
          arr.push(all[i]);
          }
      }else if(type=="b"){
      //包括文本节点和元素节点及注释节点
          if(all[i].nodeType==1 || all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && all[i].nodeType==3){
              arr.push(all[i]);
          }
      }
      
    }
    return arr;
  }

//※※※※※※※※※※※※※※※※※※※※※
//6获取子节点中的第一个
  function getFirst(father,type){
      return getChild(father,type)[0];
  }

//※※※※※※※※※※※※※※※※※※※※※
//7获取子节点中的最后一个
  function getLast(father,type){
      return getChild(father,type)[getChild(father).length-1];
  }

//※※※※※※※※※※※※※※※※※※※※※
//8通过指定的下标来获取子节点
  function getNum(father,type,num){
      return getChild(father,type)[num];
  }

//※※※※※※※※※※※※※※※※※※※※※
//9获取下一个兄弟节点
  //obj：是一个元素节点
  function getNext(obj){
      var next=obj.nextSibling;
      if(next==null){
          return false;
      }
      while(next.nodeType==8 || (next.nodeType==3&&next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足时接着再找(条件为注释节点或者节点中为空字符串是条件满足)
          next=next.nextSibling;
          if(next==null){
          return false;
          }
      }
      return next;
  }

//※※※※※※※※※※※※※※※※※※※※※
//10获取上一个兄弟节点
  function getUp(obj){
      var up=obj.previousSibling;
      if(up==null){
          return false;
      }
      while(up.nodeType==8 || (up.nodeType==3&&up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足时接着再找(条件为注释节点或者节点中为空字符串是条件满足)
          up=up.previousSibling;
          if(up==null){
          return false;
          }
      }
      return up;
  }

//※※※※※※※※※※※※※※※※※※※※※
//11插入到某个对象之后
 function insertAfter(father,newNode,obj){
    var next=getNext(obj);
    if(next){
      father.insertBefore(newNode,next);
    }else{
      father.appendChild(next);
    }
 }

//※※※※※※※※※※※※※※※※※※※※※
//12事件绑定兼容函数
  //2016.5.9
  function addEvent(obj,event,fun){
    if(obj.attachEvent){
      obj.attachEvent("on"+event,function(){
      fun.call(obj);
      });
    }else{
      obj.addEventListener(event,fun,false);
    }
  }

//※※※※※※※※※※※※※※※※※※※※※
//13删除事件
  function removeEvent(obj,event,fun){
    if(obj.detachEvent){
      obj.detachEvent("on"+event,fun);
    }else{
      obj.removeEventListener(event,fun,false);
    }
  }
  // function addEvent(obj,Event,fun){
  //     if(obj.addEventListener){
  //       obj.addEventListener(Event.slice(2),fun,false);
  //     }else{
  //       obj.attachEvent(Event,function(){
  //       fun.call(box);
  //       })
  //     }
  // }

//※※※※※※※※※※※※※※※※※※※※※
//14滚轮事件
 function mouseWheel(obj,up,down){
    if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
      obj.addEventListener("mousewheel",scrollFn,false);
      //chrome,safari -webkit-
      obj.addEventListener("DOMMouseScroll",scrollFn,false);
      //firefox -moz-
    }
    function scrollFn(e){
      var ev=e||window.event;
      //阻止浏览器的默认行为
      if(ev.preventDefault){
        ev.preventDefault();
      }else{
        ev.returnValue=false;
      }
      var val=ev.detail||ev.wheelDelta;
      if(val==-3||val==120){
        if(up){
          up();
        }        
      }else if(val==3||val==-120){
        if(down){
          down();
        }
      }
    }
 }

//※※※※※※※※※※※※※※※※※※※※※
//15.hover
 //hover函数用于有嵌套关系时给父容器加；
 //元素之间是兄弟关系时，不用hover；

 //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
 //鼠标移入移出事件
 /*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
 */
 function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
 }
 function getEvent (e) {
      return e||window.event;
 }

//※※※※※※※※※※※※※※※※※※※※※
