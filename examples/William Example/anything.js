// console.log("imported");
// const tableRow = document.createElement("tr");

// const thPound = document.createElement("th");
// tableRow.appendChild(thPound);
// thPound.innerHTML=3;

// const tdId = document.createElement("td");
// tdId.innerHTML="4";
// tableRow.appendChild(tdId);

// const tdName = document.createElement("td");
// tableRow.appendChild(tdName);
// tdName.innerHTML="charmander";
// tableRow.appendChild(tdName);


// const tdWeight = document.createElement("td");
// tableRow.appendChild(tdWeight);
// tdWeight.innerHTML="10";

// console.log(tableRow);
// document.getElementById("pkmn-table-body").appendChild(tableRow);


const html = `<tr>
<th scope="row">2</th>
<td>4</td>
<td>Charmander</td>
<td>11</td>
</tr>`

document.getElementById("pkmn-table-body").innerHTML+=html;
