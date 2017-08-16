//define functions here
var createGist = function(file_name, content, description, token){

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
  // call functions here
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
});


//bc7fed1e90d825e47cd830fcb78d0de636d967ac
