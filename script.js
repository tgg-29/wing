const DATA=[
["Roles","What are the 6 Wingman roles?","1. Monitor\n2. Report\n3. Communicate\n4. Record\n5. Update\n6. Guide"],
["Roles","Role: Monitor","Maintain continuous observation."],
["Roles","Role: Report","Identify and promptly report errors."],
["Roles","Role: Communicate","Maintain clear communication and timely updates."],
["Roles","Role: Record","Maintain accurate documentation."],
["Roles","Role: Update","Contain accurate and up-to-date information."],
["Roles","Role: Guide","Ensure correct bot identification by verifying."],
["Core Values","What are the 3 core values?","Care, Courage, and Discipline."],
["Core Values","Care","Support the operator, speak up, communicate, and handle information responsibly."],
["Core Values","Courage","Speak up, report issues, and take initiative."],
["Core Values","Discipline","Follow standards, stay focused, and perform tasks accurately."],
["Equipment","MacBook Neo","Main computing device and primary work station for Wingman. Central device for operational tasks, updates, documentation, and coordination of activities."],
["Equipment","Mouse","Enables navigation and managing applications across the MacBook and extended monitors."],
["Equipment","Monitor","Extended display for better visibility of operations. Enables Wingman to monitor operations and assist the operator."],
["Equipment","Speakerphone","Enables clear voice communication and ensures important updates and communication."],
["Tools","Google Sheets","Used for tracking operational activities."],
["Tools","Google Forms","Standardizes reporting, documentation, and tracking of incidents."],
["Tools","Slack","Used for real-time operational communication, coordination, and current updates."],
["Systems","OPS-HUB","Used for viewing and monitoring robotic operations. Has three parts: Viewer, Multiviewer, and Wingman."],
["Systems","OPS-HUB: Viewer","Shows the POVs."],
["Systems","OPS-HUB: Multiviewer","Used for checking the status of robots."],
["Systems","OPS-HUB: Wingman","List or selection of Wingman names."],
["Systems","Hermes Explore","Used to check robot battery and other operations."],
["Systems","Siren","AI function in Slack. Used to report robot failures."],
["Tasks","List the 8 Wingman tasks in order.","1. Complete the pre-operation setup\n2. Update operation details and assigned personnel\n3. Monitor live operation\n4. Guide and assist operators as needed\n5. Record operational data and useful info\n6. Monitor communication channels for updates\n7. Report issues and operational anomalies\n8. Complete the post-operation setup"],
["Tasks","What is the first Wingman task?","Complete the pre-operation setup."],
["Tasks","What is the last Wingman task?","Complete the post-operation setup."],
["Pre-Operation","List the pre-operation steps in order.","1. Log in to your Google or Slack account\n2. Update Slack (Time, Wingman, L/R Operator)\n3. Update Hermes Explore\n4. Open current cutsheet for the assigned operation\n5. Open OPS-HUB\n6. Access operation tracking sheet"],
["Pre-Operation","What details do you update in Slack before an operation?","Time, Wingman, and L/R Operator."],
["Pre-Operation","What do you open right after updating Hermes Explore?","The current cutsheet for the assigned operation."],
["During Operation","List the during-operation steps in order.","1. Record each PLUG\n2. Always verify that cable has been properly plugged\n3. Monitor Slack announcements\n4. Communicate updates\n5. Report any issues\n6. Submit an incident report"],
["During Operation","What must you always verify about the cable?","That it has been properly plugged."],
["During Operation","What do you record during operation?","Each PLUG."],
["Post-Operation","List the post-operation steps in order.","1. Ensure all records are updated and complete\n2. Conduct a proper handover to the incoming Wingman\n3. Always log out your Slack account"],
["Policy","List the 8 Wingman policies.","1. Avoid non-work-related activities\n2. Always declare errors and operational issues\n3. Remain awake, alert, and fit\n4. Always use your own Slack account\n5. Conduct Huddle in the designated Slack channel\n6. Ensure replacement before leaving\n7. Do not leave until there is a replacement (pilot, Wingman, etc.)\n8. Log out all your accounts"],
["Policy","Where should the Huddle be conducted?","In the designated Slack channel."],
["Policy","Whose Slack account should a Wingman use?","Always your own Slack account."],
["Policy","When may a Wingman leave the station?","Only after a replacement (incoming pilot, Wingman, etc.) is present."],
["Policy","What physical condition must a Wingman maintain?","Awake, alert, and fit."],
["Common Mistakes","List the 4 common mistakes.","1. Loss of focus\n2. Failure to meet Huddle or failure to provide updates\n3. Poor communication\n4. Providing wrong port information"],
["Common Mistakes","Which mistake involves ports?","Providing wrong port information."],
["Best Practices","List the best practices.","1. Verify information before action\n2. Stay productive\n3. Support operator\n4. Keep documentation accurate\n5. Perform initial checks"],
["Best Practices","What should you do with information before acting?","Verify it."]
].map((c,i)=>({id:i,cat:c[0],q:c[1],a:c[2]}));

const $=id=>document.getElementById(id);
const cats=["All",...new Set(DATA.map(d=>d.cat))];
let pool=[],idx=0,cat="All",res={}; // res[id]: 1 known, 0 missed

function shuffleArr(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function build(){
  $("chips").innerHTML="";
  cats.forEach(c=>{const b=document.createElement("button");b.className="chip"+(c===cat?" on":"");b.textContent=c;b.onclick=()=>{cat=c;start()};$("chips").appendChild(b)});
}
function start(list){
  pool=list||DATA.filter(d=>cat==="All"||d.cat===cat);
  idx=0;res={};build();show();
}
function show(){
  const finished=idx>=pool.length;
  $("done").style.display=finished?"block":"none";
  $("scene").style.display=finished?"none":"block";
  $("ctrl").style.display=finished?"none":"block";
  const known=Object.values(res).filter(v=>v===1).length,miss=Object.values(res).filter(v=>v===0).length;
  $("score").textContent=`Got it: ${known} | Needs review: ${miss}`;
  $("prog").style.width=(pool.length?Math.min(idx,pool.length)/pool.length*100:0)+"%";
  if(finished){$("pos").textContent="Finished";$("sum").textContent=`You marked ${known} of ${pool.length} cards as known and ${miss} as needing review.`;$("missed").style.display=miss?"inline-block":"none";return}
  const c=pool[idx];
  $("card").classList.remove("flip");
  $("pos").textContent=`Card ${idx+1} of ${pool.length}`;
  $("q").textContent=c.q;$("a").textContent=c.a;$("tagF").textContent=c.cat;$("tagB").textContent=c.cat;
}
const flip=()=>$("card").classList.toggle("flip");
const go=d=>{idx=Math.max(0,idx+d);show()};
const mark=v=>{if(idx<pool.length){res[pool[idx].id]=v;idx++;show()}};
$("card").onclick=flip;$("flipBtn").onclick=flip;
$("next").onclick=()=>{if(idx<pool.length){idx++;show()}};$("prev").onclick=()=>go(-1);
$("got").onclick=()=>mark(1);$("miss").onclick=()=>mark(0);
$("shuf").onclick=()=>{shuffleArr(pool);idx=0;res={};show()};
$("again").onclick=()=>start();
$("missed").onclick=()=>{const ids=Object.keys(res).filter(k=>res[k]===0).map(Number);start(DATA.filter(d=>ids.includes(d.id)))};
/* Theme: auto (follows system), light, or dark. Saved between visits. */
const root=document.documentElement,KEY="wingman-theme";
function setTheme(mode,save=true){
  if(mode==="light"||mode==="dark")root.setAttribute("data-theme",mode);else root.removeAttribute("data-theme");
  document.querySelectorAll("#themeSeg button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mode===mode)));
  if(save){try{mode==="auto"?localStorage.removeItem(KEY):localStorage.setItem(KEY,mode)}catch(e){}}
}
document.querySelectorAll("#themeSeg button").forEach(b=>b.onclick=()=>setTheme(b.dataset.mode));
let saved="auto";try{saved=localStorage.getItem(KEY)||"auto"}catch(e){}
setTheme(saved,false);

/* Accent color: chosen from the dropdown and saved between visits. */
const AKEY="wingman-accent",sel=document.getElementById("accent");
function setAccent(name,save=true){
  if(name&&name!=="blue")root.setAttribute("data-accent",name);else root.removeAttribute("data-accent");
  sel.value=name||"blue";
  if(save){try{name==="blue"?localStorage.removeItem(AKEY):localStorage.setItem(AKEY,name)}catch(e){}}
}
sel.onchange=()=>setAccent(sel.value);
let savedAccent="blue";try{savedAccent=localStorage.getItem(AKEY)||"blue"}catch(e){}
if(![...sel.options].some(o=>o.value===savedAccent))savedAccent="blue";
setAccent(savedAccent,false);
document.addEventListener("keydown",e=>{
  if(e.key===" "){e.preventDefault();flip()}
  else if(e.key==="ArrowRight"){if(idx<pool.length){idx++;show()}}
  else if(e.key==="ArrowLeft")go(-1);
  else if(e.key==="1")mark(0);
  else if(e.key==="2")mark(1);
});
start();