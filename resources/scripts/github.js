const ghn = "tw0ten"
let repos = []

async function loadRepos(){
    const rl = await fetch(`https://api.github.com/users/${ghn}/repos`);
    if(!rl.ok) return false;
    const data = await rl.json();
    for(i in data){
        if(data[i].fork){
            const or = await fetch(`https://api.github.com/repos/${ghn}/${data[i].name}`);
            if(!or.ok) continue //or return false
            data[i] = await or.json();
        }
    }
    repos = data;
    return true;
}

async function fetchRepos(){
    if(!await loadRepos())
        fetchRepos()
}