function Min (A, B)
{
	let Result = A;
	if (B < A)
	{
		Result = B;
	}
	return Result;
}

function IsNewline (Char)
{
	return ((Char == '\n') || (Char == '\r'));
}

function TokensEqual (ContentsFile, Index, Token)
{
	let Start = Index;
	let End = Min(Index + Token.length, ContentsFile.length);
	let Result = true;
	for (let i = Start; i < End; i++)
	{
		if (ContentsFile[i] != Token[i - Start])
		{
			Result = false;
			break;
		}
	}
	return Result;
}

function PutBreaksAtNewLines (String)
{
	let Result = String;
	for (let i = 0; i < Result.length; i++)
	{
		if (IsNewline(Result[i]))
		{
			Result = InsertStringInString(Result, "<br /><br />", i + 1);
		}
	}
	return Result;
}

const TitleIdentifier = "title:";
const SectionIdentifier = "section_title:";
const BodyIdentifier = "section_body:";
const ImageIdentifier = "image:";
const VideoIdentifier = "video:";
const VideoURLIdentifier = "video_link:"

function SafeGetTokenValueLengths (Contents, Start, Token)
{
	let Result = {Start: Start + Token.length, End: -1};
	for (let i = Result.Start; i < Contents.length; i++)
	{
		if (Contents[i] == ';')
		{
			Result.End = i;
			break;
		}
	}
	if (Result.End == -1)
	{
		Result.End = Contents.length;
	}
	return Result;
}

function ParseContents (ContentsFile)
{
	let Result = { Title: "", Sections: []};
	
	let TitleStart = -1;
	let TitleEnd = -1;
	for (let i = 0; i < ContentsFile.length; i++)
	{
		let ValueRange = {Start: -1, End: -1};
		
		if (TokensEqual(ContentsFile, i, TitleIdentifier))
		{
			console.log("Parsing Title");
			i += TitleIdentifier.length;
			let TitleStart = i;
			while (ContentsFile[i] != ';') { i++; }
			let TitleEnd = i;
			Result.Title = ContentsFile.substring(TitleStart, TitleEnd);
		}
		else if(TokensEqual(ContentsFile, i, SectionIdentifier))
		{
			console.log("Parsing Section");
			ValueRange = SafeGetTokenValueLengths(ContentsFile, i, SectionIdentifier);
			let SectionTitle = ContentsFile.substring(ValueRange.Start, ValueRange.End);
			SectionTitle = PutBreaksAtNewLines(SectionTitle);
			Result.Sections.push({Title: SectionTitle, Body: ""});
		}
		else if (TokensEqual(ContentsFile, i, BodyIdentifier))
		{
			console.log("Parsing Body");
			ValueRange = SafeGetTokenValueLengths(ContentsFile, i, BodyIdentifier);

			if (Result.Sections.length == 0)
			{
				Result.Sections.push({Title: "", Body: ""});				
			}

			let SectionBody = ContentsFile.substring(ValueRange.Start, ValueRange.End);
			SectionBody = PutBreaksAtNewLines(SectionBody);
			Result.Sections[Result.Sections.length - 1].Body = SectionBody;
		}
		else if (TokensEqual(ContentsFile, i, ImageIdentifier))
		{
			console.log("Parsing Image");
			ValueRange = SafeGetTokenValueLengths(ContentsFile, i, ImageIdentifier);
			let ImagePath = ContentsFile.substring(ValueRange.Start, ValueRange.End);
			Result.Sections.push({Image: ImagePath});
		}
		else if (TokensEqual(ContentsFile, i, VideoIdentifier))
		{
			console.log("Parsing Video");
			ValueRange = SafeGetTokenValueLengths(ContentsFile, i, VideoIdentifier);
			let VideoPath = ContentsFile.substring(ValueRange.Start, ValueRange.End);
			Result.Sections.push({Video: VideoPath});
		}
		else if (TokensEqual(ContentsFile, i, VideoURLIdentifier))
		{
			console.log("Parsing Link");
			ValueRange = SafeGetTokenValueLengths(ContentsFile, i, VideoURLIdentifier);
			let VideoPath = ContentsFile.substring(ValueRange.Start, ValueRange.End);
			Result.Sections.push({VideoLink: VideoPath});
		}

		if (ValueRange.End >= 0)
		{
			i = ValueRange.End;
		}
	}

	return Result;
}