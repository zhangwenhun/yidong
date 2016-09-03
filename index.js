//导航选择页效果
 var shouyenav2=$(".shouyenav2");
 var topxzy=$(".topxzy");
 var topxzyboxs=$(".topxzyboxs")[0];
 for (var i = 0; i < shouyenav2.length; i++) {
 	shouyenav2[i].index=i;
 	shouyenav2[i].onmouseover=function(){
 		for(var j=0;j<topxzy.length;j++){
 				topxzy[j].style.display="none";
 				shouyenav2[j].style.background="#e4e4e4";
 			}
 			topxzy[this.index].style.display="block";
 			shouyenav2[this.index].style.background="#f3f3f3";
 	}
 	hover(topxzyboxs,function(){
 			
 	},function(){
 		for(var j=0;j<topxzy.length;j++){
 			topxzy[j].style.display="none";
 			shouyenav2[j].style.background="#e4e4e4";
 		}
 	})
 }
 
//图片左右轮播效果
 var bntu=$(".bntu");
 var botone=$(".botone");
 var bannerleft=$(".bannerleft")[0];
 var bannerright=$(".bannerright")[0];
 var banner=$(".banner")[0];
 var now=0;
 var next=0;
 for (var i = 0; i < bntu.length; i++) {
 		bntu[i].style.left="740px";
 	}
 	bntu[0].style.left="0";
 function move(){
 	next++;
 	if(next>=bntu.length){
 		next=0;
 	}
 	bntu[next].style.left="740px";
 	for (var i = 0; i < botone.length; i++) {
 		botone[i].style.background="#b6bed0";
 	}
 	botone[next].style.background="#cb1088";
 	animate(bntu[now],{left:-740});
 	animate(bntu[next],{left:0});
 	now=next;
 }
 var t=setInterval(move,2000);
 //鼠标划上停止
  hover(banner,function(){
  		clearInterval(t);
  		bannerright.style.display="block";
  		bannerleft.style.display="block";
  },function(){
		t=setInterval(move,3000);
	  	bannerright.style.display="none";
	  	bannerleft.style.display="none";
  })
  //点击小圆点时间
  for (var i = 0; i < botone.length; i++) {
  	botone[i].index=i;
  	botone[i].onclick=function(){
  		for(var j=0;j<bntu.length;j++){
  			if(j>=this.index){
  				bntu[j].style.left="740px";
  			}else{
  				bntu[j].style.left="-740px";
  			}
  			
  			botone[j].style.background="#b6bed0";
  		}
  		if(this.index==0){
  			bntu[next].style.left="0";
  			animate(bntu[next],{left:-740});
  		}else{
  			bntu[next].style.left="0";
  			animate(bntu[next],{left:-740});
  		}
  		
  		botone[this.index].style.background="#cb1088";
  		animate(bntu[this.index],{left:0});
  		next=this.index;
  		now=next;
  		//alert(now);
  	}
 }
 //左右键点击滚动效果
  bannerright.onclick=function(){
  	move();
  }
  bannerleft.onclick=function(){
 	next--;
 	if(next<=-1){
 		next=bntu.length-1;
 	}
 	bntu[next].style.left="-740px";
 	for (var i = 0; i < botone.length; i++) {
 		botone[i].style.background="#b6bed0";
 	}
 	botone[next].style.background="#cb1088";
 	animate(bntu[now],{left:740});
 	animate(bntu[next],{left:0});
 	now=next;
   }
//固定栏效果
 var gudings=$(".gudings");
 for (var i = 0; i < gudings.length; i++) {
  gudings[i].index=i;
 	gudings[i].onmouseover=function(){
 		for(var j=0;j<gudings.length;j++){
 			//gudings[j].style.left="0";
      animate(gudings[j],{left:0},200);
 		}
    //gudings[this.index].style.left="-60px";
    animate(gudings[this.index],{left:-60},200);
 	}
  gudings[i].onmouseout=function(){
    for (var i = 0; i < gudings.length; i++) {
      animate(gudings[i],{left:0},200);
    }
    
  }
 }
//轮播
 var diwubufen=$(".diwubufen")[0];
 var diwubufen1=$(".diwubufen1");
 // function move2(){
 //    var last=getLast(diwubufen);
 //    // last.style.width="0";
 //    diwubufen.insertBefore(last,getFirst(diwubufen));
 //    // animate(last,{width:285});
 // }
 // var t=setInterval(move2,1000);

 function move2(){
    for (var i = 0; i < diwubufen1.length; i++) {
   //alert(diwubufen1[i].offsetLeft);
   var x=diwubufen1[i].offsetLeft-297;
    //diwubufen1[i].style.left=x+"px";
    if(diwubufen1[i].offsetLeft<=-297){
      var a=i;
      diwubufen1[a].style.left="1188px";
    }else{
      animate(diwubufen1[i],{left:x});
    }
    
    }
 }
 
 var tt=setInterval(move2,2000);