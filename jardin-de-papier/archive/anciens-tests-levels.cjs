const fs=require('fs'),vm=require('vm');const elements={};const ctx=new Proxy({createPattern:()=>({})},{get:(o,k)=>o[k]||(()=>{})});function el(id){return elements[id]??={style:{},parentElement:{clientWidth:1100},getContext:()=>ctx,addEventListener(){},setAttribute(){},focus(){}}}const s={console,Math,localStorage:{getItem:()=>null,setItem(){}},document:{getElementById:el,querySelectorAll:()=>[],createElement:()=>el('tile')},window:{addEventListener(){}},requestAnimationFrame(){}};vm.createContext(s);vm.runInContext(fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8').split('<script>')[1].split('</script>')[0],s);
vm.runInContext(`
function check(v,m){if(!v)throw Error(m)}
function ticks(n,j=false){for(let i=0;i<n&&mode==='playing';i++){if(j&&player.onGround)jumpQueued=true;update(1/120)}}
function go(x,j=false){for(let i=0;i<1800&&mode==='playing'&&Math.abs(player.x-x)>3;i++){keys.right=player.x<x;keys.left=player.x>x;if(j&&player.onGround)jumpQueued=true;update(1/120)}keys.left=keys.right=false}
loadLevel(0);start();go(410,true);ticks(100);go(660,true);ticks(120,true);check(mode==='won','Steps completion '+collected);draw();
loadLevel(1);start();go(645);check(box.x>650,'Box pushes');const bx=box.x;ticks(100);check(box.x===bx,'Box friction');go(700,true);ticks(220,true);go(470,true);go(150);check(mode==='won','Box completion '+collected);draw();
loadLevel(2);start();go(260);act();check(lever,'Lever activation');go(510,true);ticks(100);go(680,true);ticks(160,true);check(mode==='won','Lever completion '+collected);draw();
loadLevel(3);start();go(200);go(530);jumpQueued=true;ticks(1);for(let i=0;i<300&&bounces===0;i++)ticks(1);check(bounces>0,'Spring launches');ticks(18);go(650);ticks(120);check(mode==='won','Spring completion '+collected);draw();
loadLevel(4);start();go(400);check(padActive,'Box activates pad');go(600,true);go(810);ticks(480);check(mode==='won','Lift completion '+collected+' y '+player.y);draw();
loadLevel(0);start();pause();const x=player.x;keys.right=true;update(.01);check(player.x===x,'Pause freezes');reset();check(!keys.right&&collected===0,'Reset clears input');

function solveRoom(){const l=currentRoom();
if(l.box&&l.padX){go(400);check(padActive,'Pad activation');go(600,true);go(810);ticks(480)}
else if(l.box){go(160);go(645);go(700,true);ticks(220,true);go(470,true);go(150)}
else if(l.switchX){go(160);go(260);act();if(l.ordered||l.both){go(370);act()}check(lever&&(!l.both||secondLever),'Logic opens');go(510,true);ticks(100);go(680,true);ticks(160,true)}
else if(l.spring){go(200);go(530);if(l.adjustable)act();jumpQueued=true;ticks(1);for(let i=0;i<300&&bounces===0;i++)ticks(1);check(bounces>0,'Spring launches');ticks(18);go(650);ticks(120)}
else{go(230);go(410,true);ticks(180);go(660,true);ticks(200,true)}
check(collected===stars.length,'Workshop failed '+levelIndex+':'+roomIndex+' '+l.name+' '+collected);draw();go(1120,true);ticks(120);
}
check(levels.length===15,'15 levels');
for(let n=5;n<15;n++){loadLevel(n);start();const rooms=levels[n].rooms.length;check(totalStars()>=9,'Long level stars');for(let r=0;r<rooms;r++){check(roomIndex===r,'Room sequence');solveRoom();if(r<rooms-1){check(mode==='intro','Checkpoint transition');check(banked===(r+1)*3,'Banked stars');start()}else check(mode==='won','Long level victory '+n)}}
// Negative cases: wrong ordering, missing AND input and insufficient spring force.
loadLevel(6);roomIndex=1;reset();start();go(370);act();check(!lever&&orderStep===0,'Wrong order must fail');go(260);act();go(370);act();check(lever,'Correct order');
loadLevel(9);start();go(260);act();ticks(1);check(platforms.length===0,'One AND input cannot open bridge');go(370);act();ticks(1);check(platforms.length===2,'Both AND inputs open bridge');go(260);act();ticks(1);check(platforms.length===0,'Turning one off closes bridge');
loadLevel(10);roomIndex=1;reset();start();go(200);go(530);jumpQueued=true;ticks(1);ticks(500);check(!stars[2].got,'Weak spring cannot reach highest star');reset();check(banked===0&&collected===0,'Retry clean');
console.log('PASS: all 15 levels; every workshop traversed; checkpoint banking; correct and incorrect logic; weak spring limitation; original mechanics.');
`,s);
