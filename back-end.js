var button = document.getElementById("filter_button");
button.onclick = showList;

function showList() {
    document.getElementById("foptions").classList.toggle("show");
}