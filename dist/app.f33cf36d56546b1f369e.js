(()=>{"use strict";var t,e={799:(t,e,i)=>{var n=i(260),s=i.n(n);const o=class extends n.Scene{constructor(){super({key:"BootScene"})}preload(){this.load.spritesheet("banana-spritesheet","./assets/images/Banana_1.png",{frameWidth:24}),this.load.spritesheet("fluff-spritesheet","./assets/images/Fluff_front1.png",{frameWidth:24}),this.load.image("startgate","./assets/images/BananaBox.png"),this.load.image("endgate","./assets/images/Ship.png"),this.load.audio("music",["./assets/music/march_of_the_fluff.mp3"])}create(){this.scene.start("MenuScene")}};var d=i(890),a=i(8);class r{constructor(t,e,i,n,s,o,d,r){this.mx=t,this.my=e,this.idx=i,this.unitXco=n,this.unitYco=s,this.xco=n+o.x*r,this.yco=s+o.y*r;const l=(0,a.vs)((0,a.Iu)(n,s),(0,a.bA)(r,r),(0,a.Iu)(o.x,o.y),(0,a.U1)(o.rotation));this.points=(0,a.qU)(l,d),this.cx=this.points.reduce(((t,e)=>t+e.x),0)/this.points.length,this.cy=this.points.reduce(((t,e)=>t+e.y),0)/this.points.length,this.element=o,this.links=[]}toString(){return`unit [${this.mx} ${this.my}] index: ${this.idx}`}static getLinks(t){return Object.entries(t.links)}static getAdjacent(t){const e=t.tile&&t.tile.connectionMask||0,i=r.getLinks(t),n=[];let s=1;for(let t=0;t<i.length;++t)(e&s)>0&&n.push(i[t]),s*=2;return n}}class l{constructor(t,e,i){this.x=t,this.y=e,this.grid=i,this.nodes=[]}push(t){this.nodes.push(t)}addPrimitiveUnit(t,e,i,n,s,o){const{primitiveUnit:d,unitSize:a,points:l}=s;let h=0;for(const s of d)this.push(new r(t,e,h++,i,n,s,l,o));this.xco=i,this.yco=n,this.unitSize=a}}class h extends d.Gn{constructor(t,e){super(t,e,((t,e,i)=>new l(t,e,i)))}initLinks(t){for(const e of this.eachNode()){const i=e.x,n=e.y;for(let s=0;s<t.length;++s){const o=e.nodes[s];if(o)for(const{dx:e,dy:d,idx:a}of t[s]){const t=i+e,s=n+d,r=this.get(t,s);if(!r)continue;const l=r.nodes[a];o.links.push(l)}}}}}var c=i(157),x=i(76),y=i(737),u=i(953);const g=class extends n.GameObjects.Sprite{constructor({scene:t,node:e,asset:i}){super(t,e.cx,e.cy,i),this.node=e,this.stepsRemain=0,this.prevNode=null,this.solution=t.solution&&t.solution.slice(1)}preUpdate(t,e){if(super.preUpdate(t,e),!this.nextNode){this.stepsRemain=40;const t=r.getAdjacent(this.node).map((t=>t[1])).filter((t=>t!==this.prevNode));(0,x.h)(t.length>0),this.solution&&t.indexOf(this.solution[0])>=0?this.nextNode=this.solution.shift():this.nextNode=(0,c.d4)(t)}const i=this.nextNode.cx-this.node.cx,n=this.nextNode.cy-this.node.cy;this.x=this.nextNode.cx-this.stepsRemain*(i/40),this.y=this.nextNode.cy-this.stepsRemain*(n/40),this.stepsRemain--,this.stepsRemain<=0&&(this.prevNode=this.node,this.node=this.nextNode,this.nextNode=null,this.node===this.scene.endNode&&(this.scene.endReached(),this.destroy()),this.node.tile||this.destroy())}},p=Math.sqrt(.75),m=Math.PI,f={CAIRO:function(){const t=.5+p,e=p-.5;return{points:[{x:0,y:0},{x:p,y:.5},{x:p-.5,y:p+.5},{x:.5-p,y:p+.5},{x:-p,y:.5}],primitiveUnit:[{x:0,y:0,rotation:0},{x:-e,y:t,rotation:.5*m},{x:0,y:2*t,rotation:m},{x:e,y:t,rotation:1.5*m},{x:2*p+0,y:2*p+0,rotation:0},{x:2*p-e,y:2*p+t,rotation:.5*m},{x:2*p+0,y:2*p+2*t,rotation:m},{x:2*p+e,y:2*p+t,rotation:1.5*m}],unitSize:[4*p,4*p],links:[[{dx:0,dy:-1,idx:5},{dx:0,dy:0,idx:3},{dx:0,dy:0,idx:2},{dx:0,dy:0,idx:1},{dx:-1,dy:-1,idx:7}],[{dx:0,dy:0,idx:2},{dx:-1,dy:0,idx:4},{dx:-1,dy:0,idx:3},{dx:-1,dy:-1,idx:6},{dx:0,dy:0,idx:0}],[{dx:-1,dy:0,idx:7},{dx:0,dy:0,idx:1},{dx:0,dy:0,idx:0},{dx:0,dy:0,idx:3},{dx:0,dy:0,idx:5}],[{dx:0,dy:0,idx:0},{dx:0,dy:-1,idx:6},{dx:1,dy:0,idx:1},{dx:0,dy:0,idx:4},{dx:0,dy:0,idx:2}],[{dx:1,dy:0,idx:1},{dx:0,dy:0,idx:7},{dx:0,dy:0,idx:6},{dx:0,dy:0,idx:5},{dx:0,dy:0,idx:3}],[{dx:0,dy:0,idx:6},{dx:0,dy:1,idx:0},{dx:-1,dy:0,idx:7},{dx:0,dy:0,idx:2},{dx:0,dy:0,idx:4}],[{dx:0,dy:1,idx:3},{dx:0,dy:0,idx:5},{dx:0,dy:0,idx:4},{dx:0,dy:0,idx:7},{dx:1,dy:1,idx:1}],[{dx:0,dy:0,idx:4},{dx:1,dy:0,idx:2},{dx:1,dy:0,idx:5},{dx:1,dy:1,idx:0},{dx:0,dy:0,idx:6}]],name:"CAIRO",sides:5}}(),DIAMOND:{points:[{x:0,y:0},{x:0,y:1},{x:p,y:1.5},{x:p,y:.5}],primitiveUnit:[{x:0,y:0,rotation:0},{x:2*p,y:0,rotation:2*m/3},{x:p,y:1.5,rotation:4*m/3},{x:-p,y:1.5,rotation:0},{x:p,y:1.5,rotation:2*m/3},{x:0,y:3,rotation:4*m/3}],unitSize:[2*p,3],links:[[{dx:0,dy:0,idx:1},{dx:0,dy:0,idx:2},{dx:0,dy:0,idx:4},{dx:-1,dy:0,idx:2}],[{dx:0,dy:0,idx:2},{dx:0,dy:0,idx:0},{dx:0,dy:-1,idx:5},{dx:1,dy:-1,idx:3}],[{dx:0,dy:0,idx:0},{dx:0,dy:0,idx:1},{dx:1,dy:0,idx:0},{dx:1,dy:0,idx:4}],[{dx:0,dy:0,idx:4},{dx:0,dy:0,idx:5},{dx:-1,dy:1,idx:1},{dx:-1,dy:0,idx:5}],[{dx:0,dy:0,idx:5},{dx:0,dy:0,idx:3},{dx:-1,dy:0,idx:2},{dx:0,dy:0,idx:0}],[{dx:0,dy:0,idx:3},{dx:0,dy:0,idx:4},{dx:1,dy:0,idx:3},{dx:0,dy:1,idx:1}]],name:"DIAMOND",sides:4},SQUARE:{points:[{x:0,y:0},{x:1.5,y:0},{x:1.5,y:1.5},{x:0,y:1.5}],primitiveUnit:[{x:0,y:0,rotation:0}],unitSize:[1.5,1.5],links:[[{dx:0,dy:-1,idx:0},{dx:1,dy:0,idx:0},{dx:0,dy:1,idx:0},{dx:-1,dy:0,idx:0}]],name:"SQUARE",sides:4},HEXAGONAL:{points:[{x:0,y:0},{x:0,y:1},{x:p,y:1.5},{x:2*p,y:1},{x:2*p,y:0},{x:p,y:-.5}],primitiveUnit:[{x:0,y:0,rotation:0},{x:-p,y:1.5,rotation:0}],unitSize:[2*p,3],links:[[{dx:1,dy:-1,idx:1},{dx:1,dy:0,idx:0},{dx:1,dy:0,idx:1},{dx:0,dy:0,idx:1},{dx:-1,dy:0,idx:0},{dx:0,dy:-1,idx:1}],[{dx:0,dy:0,idx:0},{dx:1,dy:0,idx:1},{dx:0,dy:1,idx:0},{dx:-1,dy:1,idx:0},{dx:-1,dy:0,idx:1},{dx:-1,dy:0,idx:0}]],name:"HEXAGONAL",sides:6},TRIANGULAR:{points:[{x:0,y:0},{x:1,y:2*p},{x:2,y:0}],primitiveUnit:[{x:0,y:0,rotation:0},{x:1,y:2*p,rotation:m},{x:-1,y:2*p,rotation:0},{x:2,y:4*p,rotation:m}],unitSize:[2,4*p],links:[[{dx:0,dy:-1,idx:3},{dx:1,dy:0,idx:1},{dx:0,dy:0,idx:1}],[{dx:0,dy:0,idx:2},{dx:-1,dy:0,idx:0},{dx:0,dy:0,idx:0}],[{dx:0,dy:0,idx:1},{dx:0,dy:0,idx:3},{dx:-1,dy:0,idx:3}],[{dx:0,dy:1,idx:0},{dx:0,dy:0,idx:2},{dx:1,dy:0,idx:2}]],name:"TRIANGULAR",sides:3}},b=64,v={};function w(t){for(const e of Object.values(f)){v[e.name]=[];for(let i=0;i<Math.pow(2,e.sides);++i)k(t,e,i)}}function S(t){return{x:t.reduce(((t,e)=>t+e.x),0)/t.length,y:t.reduce(((t,e)=>t+e.y),0)/t.length}}function k(t,e,i){const n=`tile-${e.name}-${i}`,o=t.make.graphics({x:0,y:0,add:!1}),{points:d}=e,r=S(d),l=function(t){return{top:Math.min(...t.map((t=>t.y))),left:Math.min(...t.map((t=>t.x))),bottom:Math.max(...t.map((t=>t.y))),right:Math.max(...t.map((t=>t.x)))}}(d),h=-l.left*b+8,c=-l.top*b+8,x=(l.right-l.left)*b+16,y=(l.bottom-l.top)*b+16;!function(t,e,i,n,o,d,r,l){const{points:h,links:c,primitiveUnit:x,unitSize:y}=n,u=S(h),g=(0,a.vs)((0,a.Iu)(e,i),(0,a.bA)(b,b)),p=(0,a.qU)(g,h),m=new(s().Geom.Polygon)(p);t.fillStyle(4500036),t.fillPoints(m.points,!0);const f=c[0];let v=1;for(const{dx:n,dy:s,idx:d}of f){if(0==(o&v)){v*=2;continue}v*=2,t.lineStyle(8,13421704);const r=x[d],l=n*y[0]+r.x,h=s*y[1]+r.y,c=(0,a.vs)((0,a.Iu)(e,i),(0,a.bA)(b,b),(0,a.Iu)(l,h),(0,a.U1)(r.rotation)),p=(0,a.hC)(g,u),m=(0,a.hC)(c,u);t.lineBetween(p.x,p.y,(m.x+p.x)/2,(m.y+p.y)/2)}t.lineStyle(3,3377203),t.strokePoints(m.points,!0)}(o,h,c,e,i),o.generateTexture(n,x,y),v[e.name][i]={resKey:n,connectionMask:i,origin:{x:h,y:c},center:{x:h+r.x*b,y:c+r.y*b}}}class N{constructor({scene:t,layer:e,x:i,y:n,w:s,h:o,value:d=0,max:a=1}){this.graphics=t.make.graphics(),this.x=i,this.y=n,this.w=s,this.h=o,this.refresh(d,a),e.add(this.graphics)}refresh(t,e){this.graphics.clear(),this.graphics.fillStyle(8421504,.5),this.graphics.fillRect(this.x,this.y,this.w,this.h),this.graphics.fillStyle(16776960,1);const i=t/e;this.graphics.fillRect(this.x,this.y,this.w*i,this.h),this.graphics.lineStyle(3,8421504),this.graphics.strokeRect(this.x,this.y,this.w,this.h)}}const T=class extends s().GameObjects.Sprite{constructor({scene:t,x:e,y:i,tile:n}){super(t,e,i,n.resKey),this.grabPoint=null}preUpdate(){}dragStart(t){this.grabPoint={x:t.x-this.x,y:t.y-this.y}}dragMove(t){this.x=t.x,this.y=t.y}rotateLeft(){const t=this.scene.tesselation.sides;this.rotation-=2*Math.PI/t}rotateRight(){const t=this.scene.tesselation.sides;this.rotation+=2*Math.PI/t}dragRelease(t){const e=this.scene,i=e.findNodeAt(this.x,this.y);if(i&&!i.tile){const t=this.scene.tesselation.sides,n=function(t,e){let i=t;const n=2*Math.PI,s=n/e;for(;i<0;)i+=n;const o=Math.round(t/s)%e;return Math.abs(o)}(this.rotation,t),s=function(t,e,i){const n=1<<i;let s=t;for(let t=0;t<e;++t)(1&s)>0&&(s+=n-1),s>>=1;return s}(e.nextTile.connectionMask,n,t);e.setTile(i,e.tileSet[s]),e.updateNextTile()}else e.tweens.add({targets:[this],duration:200,x:e.control.x,y:e.control.y})}};class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n\t\t<style>\n\t\t\t.Backdrop {\n\t\t\t\tbackground: #666;\n\t\t\t\theight: 100%;\n\t\t\t\tz-index: 1000;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\n\t\t\t.Container {\n\t\t\t\theight: 100%;\n\t\t\t\twidth: 100%;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\n\t\t\t\tposition: fixed;\n\t\t\t\tbottom: 0px;\n\t\t\t\tz-index: 1001;\n\t\t\t\topacity: 1;\n\t\t\t}\n\n\t\t\t.Dialog {\n\t\t\t\tbackground: #fff;\n\t\t\t\tborder: 1px solid #dedede;\n\n\t\t\t\tfont-family: Helvetica,Tahoma,Arial,sans-serif;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tline-height: 1.4;\n\n\t\t\t\tmax-width: 80%;\n\t\t\t\tmax-height: 80%;\n\t\t\t}\n\t\t\n\t\t\tdiv {\n\t\t\t\tmargin: 0;\n\t\t\t\tpadding: 0;\n\t\t\t\ttext-align: left;\n\t\t\t}\n\t\t\n\t\t\t.Dialog_Body {\n\t\t\t\toverflow: hidden auto;\n\t\t\t\t-webkit-overflow-scrolling: touch;\n\t\t\t\tcolor: #44484a;\n\t\t\t\tmargin: 10px;\n\t\t\t\tpadding: 20px;\n\t\t\t\tpadding-left: 20px;\n\t\t\t\tmin-height: 64px;\n\t\t\t\tmin-width: 128px;\n\t\t\t}\n\n\t\t\t.Dialog_Buttons {\n\t\t\t\ttext-align: right;\n\t\t\t\tpadding: 10px 5px 10px 10px;\n\t\t\t}\n\n\t\t\t.Dialog_Buttons a:hover {\n\t\t\t\tbackground: #224467;\n\t\t\t\tcolor: #fff;\n\t\t\t}\n\n\t\t\t.Dialog_Buttons a {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\tzoom: 1;\n\t\t\t\t*display: inline;\n\t\t\t\tbackground: #516270;\n\t\t\t\tcolor: #fff;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tmargin-right: 5px !important;\n\t\t\t\tmin-width: 60px;\n\t\t\t\tpadding: 10px 15px;\n\t\t\t\ttext-align: center;\n\t\t\t\ttext-decoration: none;\n\t\t\t}\n\t\t\t\n\t\t\t.Dialog * {\n\t\t\t\t-moz-box-sizing: content-box !important;\n\t\t\t\t-webkit-box-sizing: content-box !important;\n\t\t\t\tbox-sizing: content-box !important;\n\t\t\t}\n\t\t</style>\n\t\n\t\t<div class="Backdrop" style="position: fixed; left: 0px; top: 0px; opacity: 0.4;"></div>\n\n\t\t<div class="Container">\n\t\t\t<div class="Dialog">\n\t\t\t\t<div class="Dialog_Body">\n\t\t\t\t\t<slot></slot>\n\t\t\t\t</div>\n\t\t\t\t<div class="Dialog_Buttons">\n\t\t\t\t\t<a href="javascript:void(0)" id="Dialog_Button_0">Ok</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t',this.shadowRoot.getElementById("Dialog_Button_0").addEventListener("click",(t=>{this.callback(t),this.remove()}))}}customElements.define("helix-dialog",R);const L=[{tesselation:f.SQUARE.name},{tesselation:f.TRIANGULAR.name},{tesselation:f.HEXAGONAL.name},{tesselation:f.DIAMOND.name},{tesselation:f.CAIRO.name},{tesselation:f.CAIRO.name}];class O extends s().Scene{constructor(){super({key:"GameScene"})}debugPrimaryUnitRectangle(t){const e=new(s().GameObjects.Rectangle)(this,t.xco,t.yco,t.unitSize[0]*b,t.unitSize[1]*b);e.isFilled=!1,e.isStroked=!0,e.setStrokeStyle(3,11176072,1),this.bgLayer.add(e),e.setOrigin(0,0),console.log({xco:t.xco,yco:t.yco,w:t.unitSize[0],h:t.unitSize[1],rect:e})}renderPolygons(t){for(const e of t.eachNode())for(const t of e.nodes){const{points:e}=t,i=new(s().GameObjects.Polygon)(this,0,0,e,0,1);i.setOrigin(0,0),i.isFilled=!1,i.isStroked=!0,i.setStrokeStyle(3,10526880,1),this.bgLayer.add(i),t.delegate=i}}initGates(){this.startNode=this.findNodeAt(150,150),this.setTile(this.startNode,this.tileSet[this.tileSet.length-1]);const t=new(s().GameObjects.Ellipse)(this,this.startNode.cx,this.startNode.cy,10,10,16711680,1);this.spriteLayer.add(t),this.endNode=this.findNodeAt(650,300),this.setTile(this.endNode,this.tileSet[this.tileSet.length-1]);const e=new(s().GameObjects.Ellipse)(this,this.endNode.cx,this.endNode.cy,10,10,65280,1);this.spriteLayer.add(e)}onRotateLeft(){this.draggableTile&&this.draggableTile.rotateLeft()}onRotateRight(){this.draggableTile&&this.draggableTile.rotateRight()}initUI(){const t=new(s().GameObjects.Ellipse)(this,740,60,115,115,8947848,.5);t.setStrokeStyle(2,0),this.control=t,this.uiLayer.add(t);const e=new(s().GameObjects.Text)(this,700,120,"L",{backgroundColor:"#00f",color:"#fff"});e.setInteractive().on("pointerdown",(()=>this.onRotateLeft())),this.uiLayer.add(e);const i=new(s().GameObjects.Text)(this,780,120,"R",{backgroundColor:"#00f",color:"#fff"});i.setInteractive().on("pointerdown",(()=>this.onRotateRight())),this.uiLayer.add(i),this.progressbar=new N({scene:this,layer:this.uiLayer,x:695,y:395,w:100,h:50})}addReusableAnimations(){this.anims.create({key:"fluff",frames:this.anims.generateFrameNumbers("fluff-spritesheet",{frames:[0,1]}),frameRate:5,repeat:0}),this.anims.create({key:"banana",frames:this.anims.generateFrameNumbers("banana-spritesheet",{frames:[0,1]}),frameRate:5,repeat:0})}initLevel(){this.children.removeAll(),this.bgLayer=this.add.layer(),this.bgLayer.setDepth(0),this.tileLayer=this.add.layer(),this.tileLayer.setDepth(1),this.spriteLayer=this.add.layer(),this.spriteLayer.setDepth(2),this.uiLayer=this.add.layer(),this.uiLayer.setDepth(3),this.score=0;const t=L[this.level%L.length];this.tesselation=f[t.tesselation],this.grid=function(t){const{unitSize:e,links:i}=t,n=Math.ceil(12.5/e[0]),s=Math.ceil(7.03125/e[1]);let o=0;const d=new h(n,s);for(let i=0;i<s;++i){let s=0;for(let a=0;a<n;++a)d.get(a,i).addPrimitiveUnit(a,i,s,o,t,b),s+=e[0]*b;o+=e[1]*b}return d.initLinks(i),d}(this.tesselation),this.renderPolygons(this.grid),this.tileSet=v[this.tesselation.name],this.noDeadEnds=this.tileSet.filter((t=>!(t.connectionMask in{0:0,1:1,2:2,4:4,8:8,16:16,32:32,64:64}))),this.initGates(),this.initUI(),this.updateNextTile(),(0,x.h)(null!==this.startNode),(0,x.h)(null!==this.endNode)}endReached(){this.score++,this.progressbar.refresh(this.score,10),10===this.score&&(function(t,e=(()=>{})){const i=document.createElement("helix-dialog");i.innerHTML=t,i.callback=e,document.body.appendChild(i)}("<h1>You won this level!</h1>",(()=>{this.uiBlocked=!1,this.level++,this.initLevel()})),this.uiBlocked=!0)}debugAdjacent(t){t.delegate.isFilled=!0;const e=r.getAdjacent(t);for(let t=0;t<e.length;++t){const i=e[t][1];setTimeout((()=>i.delegate.isFilled=!0),200*(t+2)),setTimeout((()=>i.delegate.isFilled=!1),200*(t+3))}setTimeout((()=>t.delegate.isFilled=!1),100),console.log(`{ dx: ${t.mx-1}, dy: ${t.my-1}, idx: ${t.idx} },`)}addMonster(){const t=new g({scene:this,node:this.startNode,asset:"banana-spritesheet"});this.spriteLayer.add(t),t.play("banana")}findNodeAt(t,e){for(const i of this.grid.eachNode())for(const n of i.nodes){if(!n.delegate)continue;const i=n.delegate;if(s().Geom.Polygon.Contains(i.geom,t,e))return n}return null}setTile(t,e){t.tile=e;const i=new(s().GameObjects.Image)(this,t.xco,t.yco,t.tile.resKey);i.setDisplayOrigin(e.origin.x,e.origin.y),i.rotation=t.element.rotation,t.tileImg=i,this.tileLayer.add(i),this.checkPath()}checkPath(){const t=(0,u.Zw)(this.startNode,this.endNode,r.getAdjacent);this.solution=(0,y.op)(this.startNode,this.endNode,t),this.solution&&console.log(this.solution)}updateNextTile(){this.nextTile=(0,c.d4)(this.noDeadEnds),this.draggableTile&&this.draggableTile.destroy(),this.draggableTile=new T({scene:this,x:740,y:60,tile:this.nextTile}),this.uiLayer.add(this.draggableTile)}create(){this.addReusableAnimations(),this.level=0,this.uiBlocked=!1,w(this),this.time.addEvent({delay:1e3,callback:()=>this.addMonster(),loop:!0}),this.initLevel(),this.input.on("pointerdown",(t=>{this.onDown(t)})),this.input.on("pointermove",(t=>this.onMove(t))),this.input.on("pointerup",(t=>this.onRelease(t))),this.sound.add("music",{loop:!0}).play()}onDown(t){const e=t.x-this.control.x+this.control.displayOriginX,i=t.y-this.control.y+this.control.displayOriginY;s().Geom.Ellipse.Contains(this.control.geom,e,i)&&(this.dragTarget=this.draggableTile,this.dragTarget.dragStart(t))}onMove(t){this.dragTarget&&this.dragTarget.dragMove(t)}onRelease(t){this.dragTarget&&(this.dragTarget.dragRelease(t),this.dragTarget=null)}}function A(t,e,i,n=!1){return t.addEventListener(e,i,n),()=>{t.removeEventListener(e,i,n)}}class E extends n.Scene{constructor(){super({key:"MenuScene"})}async create(){document.querySelector("div#wrapper").style="display: none;",document.querySelector("game-menu").style="display: visible;",this.component=document.querySelector("game-menu"),this.unregister=[A(this.component,"Start",(()=>this.startGame()))],this.events.on("shutdown",(()=>this.shutdown()))}startGame(){this.scene.start("GameScene")}shutdown(){this.unregister.forEach((t=>t())),document.querySelector("game-menu").style="display: none;",document.querySelector("div#wrapper").style="display: visible;"}}const M=i.p+"50d27cadd9fef9fca21e42604bfcb876.png";var G=i(592);class I extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}render(){this.shadowRoot.innerHTML=`\n\t\t<style>\n\t\t\t:host {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: center;\n\t\t\t\talign-items: center;\n\t\t\t\theight: 100vh;\n\n\t\t\t\tbackground-image: url(${M});\n\t\t\t\tbackground-position: center;\n\t\t\t\tbackground-repeat: no-repeat;\n\t\t\t\tbackground-size: contain;\n\t\t\t}\n\n\t\t\tbutton {\n\t\t\t\tbackground-color: #4C50AF; /* Blue */\n\t\t\t\tborder: none;\n\t\t\t\tcolor: white;\n\t\t\t\ttext-align: center;\n\t\t\t\ttext-decoration: none;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tfont-size: 16px;\n\t\t\t\tmargin: 2rem;\n\t\t\t\twidth: 10rem;\n\t\t\t\theight: 4rem;\n\t\t\t}\n\t\t\tbutton:hover {\n\t\t\t\tbackground-color: #6C70DF; /* Blue */\n\t\t\t}\n\t\t\t.main {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 30%;\n\t\t\t\ttop: 20%;\n\t\t\t}\n\t\t\tcanvas {\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 1rem;\n\t\t\t\ttop: 1rem;\n\t\t\t}\n\t\t\t.buttonBar {\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t}\n\t\t</style>\n\n\t\t<div class="main">\n\t\t\t<div class="buttonBar">\n\t\t\t\t<button id="startGame">Start Game</button>\n\t\t\t\t<button id="fullScreen">Full Screen</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<canvas id="qrcanvas"></canvas>\n\t`}connectedCallback(){this.shadowRoot.querySelector("#startGame").addEventListener("click",(()=>{this.dispatchEvent(new CustomEvent("Start")),this.dispatchEvent(new CustomEvent("button-pressed"))})),this.shadowRoot.querySelector("#fullScreen").addEventListener("click",(()=>{document.documentElement.requestFullscreen({navigationUI:"show"}).then((()=>{})).catch((t=>{alert(`An error occurred while trying to switch into full-screen mode: ${t.message} (${t.name})`)}))}));const t=this.shadowRoot.getElementById("qrcanvas");G.toCanvas(t,window.location.toString(),(function(t){t&&console.error(t)}))}}class D extends s().Scene{constructor(){super({key:"DebugTilesScene"})}preload(){}debugTilesPreview(){let t=64,e=64;for(const i of Object.keys(v).map((t=>v[t][0]))){console.log(i);const n=this.add.image(t,e,i.resKey);n.setOrigin(0,0),n.setPosition(t,e),this.add.existing(n),console.log({img:n});const s=this.add.rectangle(t,e,n.width,n.height,0);s.setOrigin(0,0),s.isFilled=!1,s.setStrokeStyle(1,255),s.isStroked=!0,this.add.circle(t+i.origin.x,e+i.origin.y,5,65535),this.add.circle(t+i.center.x,e+i.center.y,5,16711935),t+=128,t>800&&(e+=128,t=64)}this.input.on("pointermove",(t=>{console.log(t)}))}create(){w(this),this.debugTilesPreview()}}const j={type:n.AUTO,parent:"content",disableContextMenu:!0,backgroundColor:"#dddddd",width:800,height:450,localStorageName:"tins21-amarillion",fps:{target:60},scale:{mode:n.Scale.FIT,autoCenter:n.Scale.CENTER_BOTH,parent:"content"},scene:[o,O,E,D]};class U extends n.Game{constructor(){super(j)}}customElements.define("game-menu",I),window.game=new U}},i={};function n(t){var s=i[t];if(void 0!==s)return s.exports;var o=i[t]={exports:{}};return e[t].call(o.exports,o,o.exports,n),o.exports}n.m=e,t=[],n.O=(e,i,s,o)=>{if(!i){var d=1/0;for(h=0;h<t.length;h++){for(var[i,s,o]=t[h],a=!0,r=0;r<i.length;r++)(!1&o||d>=o)&&Object.keys(n.O).every((t=>n.O[t](i[r])))?i.splice(r--,1):(a=!1,o<d&&(d=o));if(a){t.splice(h--,1);var l=s();void 0!==l&&(e=l)}}return e}o=o||0;for(var h=t.length;h>0&&t[h-1][2]>o;h--)t[h]=t[h-1];t[h]=[i,s,o]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var i=e.getElementsByTagName("script");i.length&&(t=i[i.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),(()=>{var t={143:0};n.O.j=e=>0===t[e];var e=(e,i)=>{var s,o,[d,a,r]=i,l=0;for(s in a)n.o(a,s)&&(n.m[s]=a[s]);if(r)var h=r(n);for(e&&e(i);l<d.length;l++)o=d[l],n.o(t,o)&&t[o]&&t[o][0](),t[d[l]]=0;return n.O(h)},i=self.webpackChunktins21_entry=self.webpackChunktins21_entry||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))})();var s=n.O(void 0,[911],(()=>n(799)));s=n.O(s)})();