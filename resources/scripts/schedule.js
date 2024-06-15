const sce = document.getElementById("schedule");
const sc = [];

function fetchSchedule(){
    sc.sort((d1,d2)=>{return d1.date.getTime()-d2.date.getTime()});
}

function createSc(name, date){
    const e = document.createElement("p");
    e.style.textAlign="right";
    e.innerText=`${name} ${formatDate(date)}`;
    return {
        name: name,
        date: date,
        element: e
    }
}

function w0(n, x=2){
    n+="";
    for(let i = 0; i<x; i++){
        if(n.length==x)
            break;
        n = "0"+n;
    }
    return n;
}

function formatDate(d, wS=true){
    return `[${d.getDay()}.${w0(d.getDate())}/${w0(d.getMonth()+1)}|${w0(d.getHours())}:${w0(d.getMinutes())}` + (!wS ? "" : ":" + w0(d.getSeconds())) + "]";
}

function updateSchedule(){
    const d = new Date();
    while(sc.length>0&&sc[0].date.getTime()+1*60*1000<d.getTime()){
        sc.splice(0,1);
    }
    sce.innerText = "";
    let add = false;
    const max = 4;
    const hlTime = 5*60*1000;
    for(c in sc){
        if(c>=max)
            continue;
        if(sc[c].date.getTime()>d.getTime()&&!add){
            const e = document.createElement("p");
            e.innerText = formatDate(d);
            e.style.textAlign="right";
            sce.appendChild(e);
            add = true;
        }
        if(sc[c].date.getTime()-hlTime<d.getTime())
            sc[c].element.style.color="var(--acc)";
        sce.appendChild(sc[c].element);
    }
    if(!add){
        const e = document.createElement("p");
        e.innerText = formatDate(d, sc.length>0);
        e.style.textAlign="right";
        sce.appendChild(e);
    }
}

fetchSchedule();
updateSchedule();
setInterval(updateSchedule, 200);