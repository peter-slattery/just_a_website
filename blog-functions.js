function BlogPostSortFunction (A, B)
{
	if (A.hash < B.hash) { return -1; }
	if (A.hash > B.hash) { return 1; }
	return 0;
}

function SketchSortFunction (A, B)
{
	if (A.hash > B.hash) { return -1; }
	if (A.hash < B.hash) { return 1; }
	return 0;
}

function GetOrderedPostLUT (UnorderedBlogPosts, PrefixLength, SortProc)
{
	let LUT = [];
	for (let i = 0; i < files.length; i++)
	{
		LUT.push({hash: HashBlogDate(files[i], PrefixLength), index: i});
	}
	LUT.sort(SortProc);
	return LUT;
}

function HashBlogDate (Post, PrefixLength)
{
	let Result = 0;
	for (let i = 0; i < PrefixLength; i++)
	{
		let Addition = parseInt(Post[i]);
		if (!isNaN(Addition))
		{
			Result = (Result * 10) + Addition;
		}
	}
	return Result;
}

function GetNoExtensionBlogPostName (Filename)
{
	let NoExtensionFilename = Filename.substring(0, Filename.length - 4);
	return NoExtensionFilename;
}

function IsCharacter (C)
{
	return C.toLowerCase() != C.toUpperCase();
}

function GetPostTitleFromName (PostName)
{
	let Result = PostName.slice(11);
	Result = ReplaceCharAt(Result, 0, Result[0].toUpperCase());

	for (let i = 0; i < Result.length; i++)
	{
		if (Result[i] == "_")
		{
			Result = ReplaceCharAt(Result, i, " ");
			if (i + 1 < Result.length && IsCharacter(Result[i + 1]))
			{
				Result = ReplaceCharAt(Result, i + 1, Result[i + 1].toUpperCase());
			}
		}
	}

	return Result;
}

function SetURLToBlogPost (PostName)
{
	window.location.href = "blog.html?post=" + PostName;
}
