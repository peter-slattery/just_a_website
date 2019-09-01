function GetFileFromServer (Filename, OnComplete)
{
	var AboutPageRequest = new XMLHttpRequest();
	AboutPageRequest.onreadystatechange = OnComplete;
    AboutPageRequest.open('GET', Filename);
	AboutPageRequest.send();
}