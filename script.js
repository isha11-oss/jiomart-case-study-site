(function(){
var links=[].slice.call(document.querySelectorAll('.toc a')),toc=document.querySelector('.toc'),
secs=links.map(function(a){return document.getElementById(a.hash.slice(1))}),
cur=-1,tick=false,lock=null,target=0,arrived=null,de=document.documentElement;
function update(){
tick=false;
var vh=innerHeight,maxS=de.scrollHeight-vh,zone=vh*0.9,
t=Math.min(Math.max((scrollY-(maxS-zone))/zone,0),1),line=vh*(0.35+0.62*t),i=0;
secs.forEach(function(s,k){if(s.getBoundingClientRect().top<=line)i=k});
if(vh+scrollY>=de.scrollHeight-2)i=secs.length-1;
if(lock!==null){
if(arrived===null){if(Math.abs(scrollY-target)<3)arrived=scrollY}
else if(Math.abs(scrollY-arrived)>10){lock=null;arrived=null}
if(lock!==null)i=lock;
}
if(i===cur)return;cur=i;
links.forEach(function(a,k){a.classList.toggle('on',k===i);if(k===i)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
if(toc.scrollWidth>toc.clientWidth)toc.scrollTo({left:links[i].offsetLeft-24,behavior:'smooth'});
}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(update)}},{passive:true});
addEventListener('resize',update);
links.forEach(function(a,k){a.addEventListener('click',function(){
var s=secs[k],m=parseFloat(getComputedStyle(s).scrollMarginTop)||0;
lock=k;arrived=null;
target=Math.max(0,Math.min(s.getBoundingClientRect().top+scrollY-m,de.scrollHeight-innerHeight));
update();
})});
['wheel','touchstart','keydown'].forEach(function(ev){addEventListener(ev,function(){lock=null;arrived=null},{passive:true})});
update();
})();
