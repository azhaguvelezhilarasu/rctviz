function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
   td = tr[i].getElementsByTagName("td")[0];
   if (td) {
    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
     tr[i].style.display = "";
    } else {
     tr[i].style.display = "none";
    }
  }
 }
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  if(document.getElementById("myTable")!== null){
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
 }
}

function navchanger(){
        var page=document.getElementById("page").value.toLowerCase();
        var navElement = document.getElementById(page);
        navElement.className="navbarselect";
}
document.addEventListener("DOMContentLoaded",sortTable,false);
document.addEventListener("DOMContentLoaded",navchanger,false);
