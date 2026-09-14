const fs=require('fs'),vm=require('vm'),path=require('path');const elements={};const gradient={addColorStop(){}};const ctx=new Proxy({createPattern:()=>({}),createLinearGradient:()=>gradient,createRadialGradient:()=>gradient},{get:(o,k)=>o[k]||(()=>{})});function el(id){return elements[id]??={style:{setProperty(){}},parentElement:{clientWidth:1100},getContext:()=>ctx,addEventListener(){},setAttribute(){},focus(){},showModal(){this.open=true},close(){this.open=false}}}const sandbox={console,Math,localStorage:{getItem:()=>null,setItem(){}},document:{documentElement:el('html'),getElementById:el,querySelectorAll:()=>[],createElement:()=>el('tile')},window:{addEventListener(){}},requestAnimationFrame(){}};vm.createContext(sandbox);for(const f of ['levels.js','game.js','character.js','render.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),sandbox);
vm.runInContext(`
function check(v,m){if(!v)throw Error(m)}
function ticks(n,j=false){for(let i=0;i<n&&mode==='playing';i++){if(j&&player.onGround)jumpQueued=true;update(1/120)}}
function go(x,j=false){for(let i=0;i<6000&&mode==='playing'&&(Math.abs(player.x-x)>3||Math.abs(player.vx)>12);i++){const dir=level.ice?((x-player.x)*2-player.vx):x-player.x;keys.right=dir>1;keys.left=dir< -1;if(j&&player.onGround)jumpQueued=true;update(1/120)}keys.left=keys.right=false;ticks(15)}
function jumpTo(x){jumpQueued=true;go(x);ticks(130)}
function begin(i){loadLevel(i);play()}
function done(){for(const s of stars.filter(s=>!s.got&&s.y>=300)){go(s.x);ticks(170,true)}draw();console.log(index+1,level.name,collected+'/'+stars.length,stars.filter(s=>!s.got).map(s=>[s.x,s.y]));check(mode==='won','Incomplete '+level.name)}
begin(0);go(200);go(390);act();ticks(200);jumpTo(450);jumpTo(590);go(900);act();ticks(200);jumpTo(950);jumpTo(1060);jumpTo(1090);go(1400);act();ticks(200);jumpTo(1460);jumpTo(1520);jumpTo(1600);go(2040,true);done();

begin(1);for(const x of [650,1430,2050]){go(x);ticks(480)}done();
begin(2);go(420);act();go(600);ticks(240);go(790);ticks(200);go(1220);ticks(100);act();go(1400);ticks(260);go(1580);ticks(200);go(1860);ticks(100);act();go(2020);ticks(240);go(2190);ticks(200);done();
begin(3);go(340);act();jumpTo(570);ticks(600);jumpTo(680);jumpTo(840);go(1130);ticks(120);act();jumpTo(1400);ticks(600);jumpTo(1490);jumpTo(1650);go(1780);ticks(120);act();jumpTo(1950);ticks(600);jumpTo(2040);jumpTo(2200);done();
begin(4);go(535);jumpQueued=true;ticks(180);go(850);ticks(240);go(1195);jumpQueued=true;ticks(1);for(let n=0;n<300&&player.vy>-800;n++)ticks(1);go(1270);ticks(20);go(1510);ticks(240);go(1780);ticks(120);act();go(1815);jumpQueued=true;ticks(1);for(let n=0;n<300&&player.vy>-950;n++)ticks(1);go(2160);ticks(260);done();
begin(5);for(const x of [430,1130,1830]){go(x);ticks(90);act();ticks(600)}done();
begin(6);for(const [x,z] of [[520,800],[1320,1640],[2020,2300]]){go(x);for(let n=0;n<2400;n++){if(player.onGround&&player.y>450)jumpQueued=true;ticks(1);if(player.support?.obj?.kind==='moving'&&player.y<265)break}jumpTo(z);ticks(300,true)}done();
begin(7);go(285);ticks(10);check(flags.a,'Weight A');jumpTo(530);ticks(240,true);ticks(180);jumpTo(690);ticks(850);jumpTo(920);go(960);keys.down=true;ticks(160);keys.down=false;go(1095);ticks(20);check(flags.b,'Weight B');jumpTo(1360);ticks(240,true);ticks(180);jumpTo(1530);ticks(850);jumpTo(1760);go(1850);keys.down=true;ticks(160);keys.down=false;go(2025);ticks(20);check(flags.c,'Weight C');jumpTo(2120);ticks(240,true);ticks(180);jumpTo(2280);ticks(850,true);done();
begin(8);go(270);act();go(550,true);ticks(200,true);go(960,true);ticks(300,true);go(1460,true);ticks(200,true);go(1910,true);ticks(300,true);go(2340,true);ticks(240,true);done();
begin(9);for(const s of stars){go(s.x);for(let n=0;n<2500&&!s.got;n++){keys.up=player.y>s.y+50;keys.down=player.y<s.y+35;update(1/120)}keys.up=keys.down=false}done();
begin(10);for(const [x,targets] of [[430,[740,960]],[1250,[1570,1780]],[1980,[2110,2270]]]){go(x);ticks(160);for(let n=0;n<3&&!flags[objects.find(o=>o.x===x).id];n++)act();for(const t of targets){go(t,true);ticks(180,true);ticks(180)}}done();
begin(11);for(const x of [370,1110,1850]){go(x);ticks(120);act();ticks(600)}go(1520,true);ticks(240,true);ticks(160);jumpTo(1670);done();
begin(12);for(const x of [560,780,350,1770,1410,1600]){go(x);ticks(180);act()}check(flags.song0&&flags.song1,'Songs');done();
begin(13);for(const [x,t] of [[360,900],[1230,1790],[2050,2420]]){go(x);ticks(150);act();go(t);ticks(200,true)}done();
begin(14);go(430);ticks(100);for(let n=0;n<3&&!flags.a;n++)act();go(750,true);ticks(180,true);go(970,true);ticks(200,true);go(1150);ticks(200);act();ticks(700);go(1710,true);ticks(200,true);go(1870);ticks(200);act();go(2120);ticks(280);go(2340);ticks(220);go(2410);jumpTo(2610);ticks(240,true);done();

// Fail-closed puzzle conditions and physics comparisons, without moving the player by assignment.
begin(14);go(1870);ticks(120);act();check(!flags.c&&!objects.find(o=>o.kind==='fan').on,'Final fan must require both energy sources');
begin(12);go(350);ticks(100);act();check(!flags.song0&&seq[0]===0,'Incorrect first note must not unlock song');
begin(10);check(!flags.a&&platforms.length===0,'Mirror bridges initially inactive');go(430);ticks(100);for(let n=0;n<3&&!flags.a;n++)act();ticks(1);check(flags.a&&platforms.length===2,'Correct reflection builds bridge');act();ticks(1);check(!flags.a&&platforms.length===0,'Wrong reflection removes bridge');
begin(0);keys.right=true;ticks(90);keys.right=false;const before=player.x;ticks(120);const normalDrift=player.x-before;
begin(1);keys.right=true;ticks(90);keys.right=false;const iceBefore=player.x;ticks(120);check(player.x-iceBefore>normalDrift*3,'Ice preserves more horizontal motion');
begin(8);go(270);ticks(150);jumpQueued=true;ticks(1);let strongMin=player.y;for(let n=0;n<240;n++){ticks(1);strongMin=Math.min(strongMin,player.y)}act();jumpQueued=true;ticks(1);let weakMin=player.y;for(let n=0;n<300;n++){ticks(1);weakMin=Math.min(weakMin,player.y)}check(weakMin<strongMin-100,'Weaker gravity creates higher jump');
begin(9);ticks(300);const lightY=player.y;act();ticks(350);check(player.y>lightY+100,'Ballast causes descent');
begin(0);pause();const frozen=player.x;keys.right=true;ticks(100);check(player.x===frozen,'Pause preserves position');reset();check(!keys.right&&collected===0,'Reset clears controls and stars');
console.log('PASS: 15 complete routes, puzzle rejection cases, ice friction, gravity, buoyancy, pause and reset.');
`,sandbox);
