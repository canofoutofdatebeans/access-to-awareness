/* ============================================================
   ACCESS TO AWARENESS — shared front-end
   ============================================================ */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var yr = document.getElementById("yr"); if(yr) yr.textContent = new Date().getFullYear();

  /* ---- language (i18n) — runs before headings are split ---- */
  var LANG = (function(){ try{ return localStorage.getItem("lang")||"en"; }catch(e){ return "en"; } })();
  document.documentElement.lang = LANG;
  (function(){
    var DICT = (window.I18N && window.I18N.fr) || {};
    function norm(s){ return s.replace(/\s+/g," ").trim(); }
    function has(k){ return Object.prototype.hasOwnProperty.call(DICT,k); }
    if(LANG==="fr"){
      var w=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), node, nodes=[];
      while((node=w.nextNode())){ nodes.push(node); }
      nodes.forEach(function(n){
        var raw=n.nodeValue, key=norm(raw); if(!key) return;
        if(has(key)){ var lead=(raw.match(/^\s*/)||[""])[0], trail=(raw.match(/\s*$/)||[""])[0]; n.nodeValue=lead+DICT[key]+trail; }
      });
      ["placeholder","aria-label","alt","title"].forEach(function(attr){
        document.querySelectorAll("["+attr+"]").forEach(function(el){ var v=norm(el.getAttribute(attr)); if(has(v)) el.setAttribute(attr,DICT[v]); });
      });
      var tk=norm(document.title); if(has(tk)) document.title=DICT[tk];
    }
    var btn=document.createElement("button");
    btn.className="lang-toggle"; btn.type="button"; btn.textContent=(LANG==="fr")?"EN":"FR";
    btn.setAttribute("aria-label", LANG==="fr"?"Switch to English":"Passer en français");
    btn.addEventListener("click", function(){ try{ localStorage.setItem("lang", LANG==="fr"?"en":"fr"); }catch(e){} location.reload(); });
    var mo=document.getElementById("menuOpen");
    if(mo && mo.parentNode){ mo.parentNode.insertBefore(btn, mo); } else { document.body.appendChild(btn); }
  })();

  /* theme toggle */
  var root = document.documentElement, tbtn = document.getElementById("themeToggle");
  function currentDark(){ var t=root.getAttribute("data-theme"); if(t) return t==="dark"; return window.matchMedia("(prefers-color-scheme: dark)").matches; }
  function syncIcon(){ if(tbtn) tbtn.textContent = currentDark() ? "☀" : "☾"; }
  syncIcon();
  if(tbtn) tbtn.addEventListener("click", function(){ root.setAttribute("data-theme", currentDark()?"light":"dark"); syncIcon(); });

  /* split words */
  function splitWords(el){
    var text = el.textContent.trim(); el.setAttribute("aria-label", text); el.innerHTML="";
    var parts = text.split(/\s+/);
    parts.forEach(function(w,i){
      var line=document.createElement("span"); line.className="reveal-line";
      var word=document.createElement("span"); word.className="word"; word.setAttribute("aria-hidden","true");
      word.textContent=w; word.style.transitionDelay=(i*0.05)+"s";
      line.appendChild(word); el.appendChild(line);
      if(i<parts.length-1) el.appendChild(document.createTextNode(" "));
    });
  }
  [].slice.call(document.querySelectorAll("[data-split]")).forEach(splitWords);

  if(reduce){
    document.querySelectorAll(".fade-up,[data-split],.img-mask").forEach(function(e){ e.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold:0.15, rootMargin:"0px 0px -8% 0px" });
    document.querySelectorAll(".fade-up,[data-split],.img-mask").forEach(function(e){ io.observe(e); });

    /* hero load cascade (home) */
    function cascade(){ document.querySelectorAll(".hero [data-delay]").forEach(function(e){ var d=parseInt(e.getAttribute("data-delay"),10)||0; setTimeout(function(){ e.classList.add("in"); }, 250+d*180); }); }
    if(document.querySelector(".hero [data-delay]")){ window.addEventListener("load", cascade); setTimeout(cascade,1300); }
  }

  /* custom cursor */
  var ring=document.getElementById("ring"), dot=document.getElementById("dot");
  if(ring && !reduce && window.matchMedia("(pointer:fine)").matches){
    var rx=innerWidth/2, ry=innerHeight/2, dx=rx, dy=ry;
    document.addEventListener("mousemove", function(e){ dx=e.clientX; dy=e.clientY; dot.style.left=dx+"px"; dot.style.top=dy+"px"; });
    (function loop(){ rx+=(dx-rx)*.16; ry+=(dy-ry)*.16; ring.style.left=rx+"px"; ring.style.top=ry+"px"; requestAnimationFrame(loop); })();
    document.querySelectorAll("a,button,input,[data-hover]").forEach(function(el){
      el.addEventListener("mouseenter", function(){ document.body.classList.add("hovering"); });
      el.addEventListener("mouseleave", function(){ document.body.classList.remove("hovering"); });
    });
  } else if(ring){ ring.style.display="none"; if(dot) dot.style.display="none"; }

  /* header + progress */
  var header=document.getElementById("header"), progress=document.getElementById("progress"), lastY=0;
  window.addEventListener("scroll", function(){
    var y=window.scrollY, h=document.documentElement.scrollHeight-innerHeight;
    if(progress) progress.style.width=(h>0?(y/h*100):0)+"%";
    if(header){ header.classList.toggle("scrolled", y>40); if(y>lastY && y>320) header.classList.add("hidden"); else header.classList.remove("hidden"); }
    lastY=y;
  }, {passive:true});

  /* menu overlay */
  var overlay=document.getElementById("overlay"), mOpen=document.getElementById("menuOpen"), mClose=document.getElementById("menuClose");
  if(mOpen&&overlay) mOpen.addEventListener("click", function(){ overlay.classList.add("open"); });
  if(mClose&&overlay) mClose.addEventListener("click", function(){ overlay.classList.remove("open"); });
  if(overlay) overlay.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ overlay.classList.remove("open"); }); });

  /* magnetic */
  if(!reduce && window.matchMedia("(pointer:fine)").matches){
    document.querySelectorAll(".btn,.menu-toggle").forEach(function(btn){
      btn.addEventListener("mousemove", function(e){ var r=btn.getBoundingClientRect(); btn.style.transform="translate("+((e.clientX-r.left-r.width/2)*0.25)+"px,"+((e.clientY-r.top-r.height/2)*0.35)+"px)"; });
      btn.addEventListener("mouseleave", function(){ btn.style.transform=""; });
    });
  }

  /* newsletter demo */
  document.querySelectorAll("form[data-demo]").forEach(function(form){
    var note = form.parentNode.querySelector(".form-note");
    form.addEventListener("submit", function(e){ e.preventDefault(); if(note) note.textContent="Thank you. Watch for a letter soon."; form.reset(); });
  });

  /* marquee duplicate */
  var mq=document.getElementById("marquee"); if(mq) mq.innerHTML += mq.innerHTML;

  /* counter */
  document.querySelectorAll("[data-count]").forEach(function(c){
    var target=+c.getAttribute("data-count"), done=false;
    var cio=new IntersectionObserver(function(en){ en.forEach(function(x){
      if(x.isIntersecting && !done){ done=true;
        if(reduce){ c.textContent=target.toLocaleString()+"+"; return; }
        var start=null; function step(ts){ if(!start) start=ts; var p=Math.min((ts-start)/2000,1); var e=1-Math.pow(1-p,3); c.textContent=Math.floor(e*target).toLocaleString()+"+"; if(p<1) requestAnimationFrame(step); } requestAnimationFrame(step);
      }
    }); },{threshold:0.6});
    cio.observe(c);
  });

  /* ===== canvas awareness sphere (home only) ===== */
  var cvs=document.getElementById("sphere");
  if(cvs){
    var ctx=cvs.getContext("2d"), DPR=Math.min(window.devicePixelRatio||1,2), W=0,H=0, N=1700, pts=[];
    for(var i=0;i<N;i++){ var phi=Math.acos(1-2*(i+0.5)/N), theta=Math.PI*(1+Math.sqrt(5))*i, r=0.82+0.18*(((Math.sin(i*12.9898)*43758.5453)%1+1)%1);
      pts.push({x:r*Math.sin(phi)*Math.cos(theta), y:r*Math.cos(phi), z:r*Math.sin(phi)*Math.sin(theta)}); }
    var pColor="74,80,56";
    function readColor(){ var v=getComputedStyle(root).getPropertyValue("--particle").trim(); if(v) pColor=v; }
    readColor();
    function size(){ W=cvs.clientWidth||1; H=cvs.clientHeight||1; cvs.width=W*DPR; cvs.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); }
    size(); window.addEventListener("resize", function(){ size(); readColor(); }); window.addEventListener("load", size);
    if(window.ResizeObserver){ new ResizeObserver(size).observe(cvs); }
    new MutationObserver(readColor).observe(root,{attributes:true, attributeFilter:["data-theme"]});
    var t=0, ry=0, mx=0, my=0, tmx=0, tmy=0, fade=0;
    window.addEventListener("mousemove", function(e){ tmx=(e.clientX/innerWidth)*2-1; tmy=(e.clientY/innerHeight)*2-1; });
    function draw(){
      t+=0.005; ry+=0.0016; fade+=(1-fade)*0.02; mx+=(tmx-mx)*0.05; my+=(tmy-my)*0.05;
      ctx.clearRect(0,0,W,H);
      var cx=W/2, cy=H/2, R=Math.min(W,H)*0.34*(1+Math.sin(t*1.1)*0.015);
      var cY=Math.cos(ry), sY=Math.sin(ry), pitch=my*0.3, cX=Math.cos(pitch), sX=Math.sin(pitch);
      for(var k=0;k<pts.length;k++){ var p=pts[k];
        var x=p.x*cY-p.z*sY, z=p.x*sY+p.z*cY, y=p.y, y2=y*cX-z*sX, z2=y*sX+z*cX, persp=1/(2-z2);
        var sx=cx+x*R*persp+mx*18, sy=cy+y2*R*persp+my*10, depth=(z2+1)/2, a=(0.12+depth*0.5)*fade, s=0.5+depth*1.1;
        ctx.globalAlpha=a; ctx.fillStyle="rgb("+pColor+")"; ctx.beginPath(); ctx.arc(sx,sy,s,0,6.2832); ctx.fill();
      }
      ctx.globalAlpha=1; if(!reduce) requestAnimationFrame(draw);
    }
    if(reduce){ fade=1; draw(); } else { requestAnimationFrame(draw); }
  }
})();
