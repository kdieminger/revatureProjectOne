// addEventListener(event,callback,bubbleOrCapture)
document.getElementById("add-button").addEventListener("click",addRow);



function addRow(){
    const html = `<tr>
<th scope="row">2</th>
<td>4</td>
<td>Charmander</td>
<td>11</td>
</tr>`

document.getElementById("pkmn-table-body").innerHTML+=html;
}

document.getElementById("get-data-button").addEventListener("click",getData)
function getData(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4 && xhr.status===200)
        {
            console.log(xhr.response);
        }
    }

    xhr.open("GET","https://pokeapi.co/api/v2/pokemon/300",true);
    xhr.send();
}