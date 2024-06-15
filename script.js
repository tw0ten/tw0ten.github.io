document.getElementById("t").innerText = `${new Date().getFullYear() - 2020}+`;

function genName() {
    const randstr = "=-0987654321`~qwertyuiop[]asdfghjkl;'zxcvbnm/QWERTYUIOP{}|\\ASDFGHJKL:\"ZXCVBNM<>?!@#$%^&*()_+"//+",.";
    let s = "";
    for(let i = 0; i<13; i++){
        if(i==5){
            s+=" ";
            continue;
        }
        s+=randstr[Math.floor(Math.random()*randstr.length)];
    }
    return s;
}
document.getElementById("name").innerText = genName();
