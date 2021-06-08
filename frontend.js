function NewBookMenu() {
  var title = document.getElementById("title");
  title.innerHTML="Add new book:";
  document.getElementById("subtext").parentNode.removeChild(subtext);
  document.getElementById("newbookbutton").outerHTML="";
  document.getElementById("searchbutton").outerHTML="";
  const SelectionsDiv = document.createElement("div");
  SelectionsDiv.setAttribute("class","form")
  var authorTextBox = document.createElement("INPUT");
  authorTextBox.setAttribute("type", "text");
  authorTextBox.setAttribute("placeholder", "Author");
  authorTextBox.setAttribute("id","authtext");
  var titleTextBox = document.createElement("INPUT");
  titleTextBox.setAttribute("type", "text");
  titleTextBox.setAttribute("placeholder", "Title");
  titleTextBox.setAttribute("id","titletext");
  var genreSelector = document.createElement("SELECT");
  genreSelector.setAttribute("id", "mySelect");
  document.body.appendChild(SelectionsDiv); 
  SelectionsDiv.appendChild(genreSelector);
  var op1 = document.createElement("option");
  var op2 = document.createElement("option");
  var op3 = document.createElement("option");
  var op4 = document.createElement("option");
  var op5 = document.createElement("option");
  var op6 = document.createElement("option");
  var op7 = document.createElement("option");
  op1.setAttribute("value", "Science Fiction");
  op2.setAttribute("value", "Satire");
  op3.setAttribute("value", "Drama");
  op4.setAttribute("value", "Action and Adventure");
  op5.setAttribute("value", "Romance");
  op6.setAttribute("value", "Mystery");
  op7.setAttribute("value", "Horror");
  op1.append(document.createTextNode("Science Fiction"));
  op2.append(document.createTextNode("Satire"));
  op3.append(document.createTextNode("Drama"));
  op4.append(document.createTextNode("Action and Adventure"));
  op5.append(document.createTextNode("Romance"));
  op6.append(document.createTextNode("Mystery"));
  op7.append(document.createTextNode("Horror"));
  document.getElementById("mySelect").appendChild(op1);
  document.getElementById("mySelect").appendChild(op2);
  document.getElementById("mySelect").appendChild(op3);
  document.getElementById("mySelect").appendChild(op4);
  document.getElementById("mySelect").appendChild(op5);
  document.getElementById("mySelect").appendChild(op6);
  document.getElementById("mySelect").appendChild(op7);
  SelectionsDiv.appendChild(authorTextBox);
  SelectionsDiv.appendChild(titleTextBox);
  var priceTextBox = document.createElement("INPUT");
  priceTextBox.setAttribute("type", "text");
  priceTextBox.setAttribute("placeholder", "Price");
  priceTextBox.setAttribute("id","pricetext");
  priceTextBox.setAttribute("onkeypress","return isNumber(event)")
  SelectionsDiv.appendChild(priceTextBox); 
  var savebtn = document.createElement("BUTTON");   
  savebtn.innerHTML = "Save Book";                   
  SelectionsDiv.appendChild(savebtn);
  savebtn.onclick=function(){
      sendBookData(document.getElementById("titletext").value,document.getElementById("authtext").value,document.getElementById("pricetext").value,document.getElementById("mySelect").value);
  }
  var backbtn = document.createElement("BUTTON");   
  backbtn.innerHTML = "Back";                   
  SelectionsDiv.appendChild(backbtn);
  backbtn.onclick=function(){
    location.reload();
  }       
}

function sendBookData(title,author,price,genre){
  var xhr = new XMLHttpRequest()
  let msgShown=false;
  var url = "http://bibas.ddns.net:3000/books";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var Bookobj = {title: title, author: author, price: price,genre: genre };
  var BookJSON = JSON.stringify(Bookobj);
  console.info(BookJSON);
  xhr.send(BookJSON);
  xhr.addEventListener('readystatechange', function() {
    if (xhr.status == 200 && msgShown===false) {
      alert( "Book added successfully!" );
      msgShown=true;
    } else if (msgShown===false) {
      alert( "There was an error while adding the book\nMake sure that the backend is running." );
      msgShown=true;
    }
  });
}

function BookSearchMenu(){
  var title = document.getElementById("title");
  title.innerHTML="Search all books:";
  document.getElementById("subtext").parentNode.removeChild(subtext);
  document.getElementById("newbookbutton").outerHTML="";
  document.getElementById("searchbutton").outerHTML="";
  const SelectionsDiv = document.createElement("div");
  SelectionsDiv.setAttribute("class","form")
  var searchTextBox = document.createElement("INPUT");
  searchTextBox.setAttribute("type", "text");
  searchTextBox.setAttribute("placeholder", "Keyword");
  searchTextBox.setAttribute("id", "searchBox");
  var searchbtn = document.createElement("BUTTON");   
  searchbtn.innerHTML = "Search";                
  document.body.appendChild(SelectionsDiv); 
  SelectionsDiv.appendChild(searchTextBox); 
  var backbtn = document.createElement("BUTTON");   
  backbtn.innerHTML = "Back";                   
  backbtn.onclick=function(){
    location.reload();
  }  
  SelectionsDiv.appendChild(backbtn);
  SelectionsDiv.appendChild(searchbtn);
  var resultsdiv = document.createElement("div");
    var resultsTA=document.createElement("textarea");
    resultsdiv.setAttribute("id","rdiv")
    resultsTA.setAttribute("readonly",true);
    resultsTA.setAttribute("id","rTA");
    document.body.appendChild(resultsdiv);
    resultsdiv.appendChild(resultsTA);
  searchbtn.onclick=function(){
    resultsTA.innerHTML=SendSearchGet(document.getElementById("searchBox").value);
  }
}

function SendSearchGet(searchString){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://bibas.ddns.net:3000/books/"+searchString+"/", false ); 
  xmlHttp.send();
  return xmlHttp.responseText;
}



function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    alert("Valid characters are numbers 0-9 and dot")
      return false;
  }
  return true;
}