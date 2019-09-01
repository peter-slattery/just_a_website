// TODO(Peter): These are copying the string every time you edit a character
// that's really not great if you're editing a lot of characters, kind of like we are in blog-functions
function ReplaceCharAt(String, Index, NewChar)
{
	let Result = [String.substring(0, Index), NewChar, String.substring(Index + 1)].join('');
	return Result;
}

function InsertStringInString(Destination, ToInsert, AtIndex)
{
	let Result = [Destination.substring(0, AtIndex), ToInsert, Destination.substring(AtIndex)].join('');
	return Result;
}
