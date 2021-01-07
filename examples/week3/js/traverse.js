window.onload = () => {
    let body = document.getElementsByTagName('body')[0];
    displayElement(body);
}

function displayElement(element) {
    console.log(element);
    let children = element.childNodes;
    for(let child of children) {
        displayElement(child);
    }
}