//define functions here
var createGist = function(file_name, content, description, token){

	var jsonData = {
				  "description": description,
				  "public": true,
				  "files": {
				    [file_name]: {
				      "content": content
				    }
				  }
				}

	$.ajax({
		url: "https://api.github.com/gists",
		type: "POST",
		headers: {
			Authorization: "token " + token
		},
		data: JSON.stringify(jsonData),
		success: function (data){console.log(data)},
		error: function(data){console.log(data)}
	}).done(function (data){myGists(data.owner.login, token)})

};

var myGists = function (username, token){
	//https://api.github.com/users/:username/gists

	$.ajax({
		url: "https://api.github.com/users/" + username + "/gists",
		type: "GET",
		headers: {
			Authorization: "token " + token
		},
		success: function (data){ displayGists(data)}
	})


};

var bindCreateButton = function() {
  document.getElementById("create-gist-form").addEventListener("submit", function (){
  		event.preventDefault()
  		var fileName = document.getElementById("new-gist-file-name").value
  		var content = document.getElementById("new-gist-content").value
  		var description = document.getElementById("new-gist-description").value
  		var token = document.getElementById("new-gist-token").value

  		createGist(fileName, content, description, token)
  })
};


function displayGists(data){

	var gistUL = "<ul>" + data.map(function(gist){
		if (!gist.description) {
			gist.description = "No description"
		}

		return "<li><a href='" + gist.html_url +"'>" +  gist.description + "</a></li>"
		

	}).join("") + "</ul>"

	document.getElementById('gist-list').innerHTML = gistUL

}



$(document).ready(function(){

	document.getElementById("search").addEventListener("click", function(){
		var username = document.getElementById('username').value
		var token = document.getElementById('token').value

		myGists(username, token)
	})

	bindCreateButton()
});


//17b3c047335e6ad5ffd39593ef2ee13211570fbc
