document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){
	//grab the content from form
	
	var siteName=document.getElementById('siteName').value;
	var siteUrl=document.getElementById('siteUrl').value;
	
	//store the content in form of object
	if(!validateForm(siteName,siteUrl))
		return false;
	var bookmark={
		name:siteName,
		url:siteUrl,
	}
	//Test if local storage is empty
	if(localStorage.getItem('bookmarks')==null){
		var bookmarks=[];
		//store the bookmark object in bookmarks array
		bookmarks.push(bookmark);
		//Save the bookmarks in localStorage but convert it to String from JSON object
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}else{
		//fetch the bookmarks array 
		//JSON.parse() to convert string to JSON object
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		//Re-set back to localStorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	//Reset the form
	document.getElementById("myForm").reset();
	//to stop the default behaviour of the form of submitting.
	fetchBookmarks();
	e.preventDefault();

}

function fetchBookmarks(){
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		var bookmarkResult=document.getElementById('bookmarkResult');
		bookmarksResults.innerHTML='';
		
		
		//loop through each bookmarks
		for(i=0;i<bookmarks.length;i++){
			var name=bookmarks[i].name;
			var url=bookmarks[i].url;
			bookmarksResults.innerHTML += '<div class="well" style="background-color:#E9ECEF;margin-bottom:25px">'+
                                  '<h3 style="padding:5px 0 5px 5px">'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
		}
}

function deleteBookmark(url){
	//1. Get bookmark from local storage
	var bookmark=JSON.parse(localStorage.getItem('bookmarks'));
	//2. Loop through bookmarks
	for(var i=0;i<bookmark.length;i++){
		if(bookmark[i].url==url)
			//remove from array
			bookmark.splice(i,1);
	}
	//3.Reset the local storage
	localStorage.setItem('bookmarks',JSON.stringify(bookmark));
	
	fetchBookmarks();
}

function validateForm(siteName,siteUrl){
	//form validation
	if(!siteName||!siteUrl){
		alert("Empty cell not allowed");
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if(!siteUrl.match(regex)){
		alert("Invalid url\nFormat:http://xyzurl.com");
		return false;
	}
	return true;
}