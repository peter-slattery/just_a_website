function CreateImage (File)
{
	let Image = CreateEmptyElement("img", "full_bar_image");
	Image.src = File;
	return Image;
}

function CreateCircleImage (File)
{
	let Image = CreateEmptyElement("div", "circle_image");
	Image.style.backgroundImage = "url(" + File + ")";
	return Image;
}

function CreateVideo (File)
{
	let Video = CreateEmptyElement("video", "video_player");
	Video.src = File;
	Video.controls = true;
	return Video;
}

function CreateVideoLink (URL)
{
	let Video = CreateEmptyElement("iframe", "youtube");
	Video.width = 560;
	Video.height = 315;
	Video.frameborder = 0;
	Video.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
	Video.allowfullscreen = true;
	Video.src = URL;
	Video.controls = true;
	return Video;
}

function CreateContentsSection (Sections)
{
	let Contents = CreateEmptyElement("div", "contents");
	for (let i = 0; i < Sections.length; i++)
	{
		let Section = Sections[i];
		if (Section.Title != undefined && Section.Title != null && Section.Title != "")
		{
			console.log("Gen Title");
			AppendChild(Contents, "div", "subtitle", Section.Title);
		}
		if (Section.Body != undefined && Section.Body != null && Section.Body != "")
		{
			console.log("Gen Body");
			AppendChild(Contents, "div", "text", Section.Body);
		}
		if (Section.Image != undefined && Section.Image != null && Section.Image != "")
		{
			console.log("Gen Image");
			AppendExistingChild(Contents, CreateImage(Section.Image));
		}
		if (Section.Video != undefined && Section.Video != null && Section.Video != "")
		{
			console.log("Gen Video");
			AppendExistingChild(Contents, CreateVideo(Section.Video));
		}
		if (Section.VideoLink != undefined && Section.VideoLink != null && Section.VideoLink != "")
		{
			console.log("Gen Link");
			AppendExistingChild(Contents, CreateVideoLink(Section.VideoLink));
		}
		
	}
	return Contents;
}

function CreatePageJustTitle (Title)
{
	let Page = CreateEmptyElement("div", "page");
	AppendChild(Page, "div", "title", Title);
	return Page;
}

function CreatePage (Title, Contents)
{
	let Page = CreatePageJustTitle(Title);
	AppendExistingChild(Page, CreateContentsSection(Contents));
	return Page;
}

function RenderNav ()
{
	let Nav = CreateEmptyElement("div", "nav");

	AppendChild(Nav, "div", "title", "Peter Slattery");
	AppendChild(Nav, "div", "contact", "slattery.peter.j@gmail.com");
	
	AppendChild(Nav, "hr", "", "");

	let AboutBtn = AppendChildLink(Nav, "button", "\\", "About");
	let SketchbookBtn = AppendChildLink(Nav, "button", "\\work.html", "Work");
	let BlogBtn = AppendChildLink(Nav, "button", "\\blog.html", "Blog");
	let Source = AppendChildLink(Nav, "button", "https://github.com/peter-slattery/just_a_website", "Source");
	document.body.appendChild(Nav);
}

function RenderPage (Title, Contents)
{
	let Page = CreatePage(Title, Contents);
	document.body.appendChild(Page);
}

function RenderBlogNav (CurrentBlogPost, BlogPostCount, GoToNextPost, GoToPrevPost)
{
	let BlogNav = CreateEmptyElement("div", "blog_nav");

	if (CurrentBlogPost > 0)
	{
		let PrevBtn = CreateElement("div", "button", "Prev");
		PrevBtn.id = "prev";
		PrevBtn = SetOnClick(PrevBtn, GoToPrevPost);
		AppendExistingChild(BlogNav, PrevBtn);
	}
	
	let IndexBtn = CreateElement("a", "button", "Index");
	IndexBtn.href = "/blog-index.html";
	IndexBtn.id = "index";
	AppendExistingChild(BlogNav, IndexBtn);

	if (CurrentBlogPost < BlogPostCount - 1)
	{
		let NextBtn = CreateElement("div", "button", "Next");
		NextBtn.id = "next";
		NextBtn = SetOnClick(NextBtn, GoToNextPost);
		AppendExistingChild(BlogNav, NextBtn);
	}
	
	return BlogNav;
}

function RenderBlogPage (Title, Contents, CurrentBlogPost, BlogPostCount, GoToNextPost, GoToPrevPost)
{
	let Page = CreateEmptyElement("div", "page");
	AppendChild(Page, "div", "title", Title);
	AppendExistingChild(Page, RenderBlogNav(CurrentBlogPost, BlogPostCount, GoToNextPost, GoToPrevPost));
	AppendExistingChild(Page, CreateContentsSection(Contents));
	document.body.appendChild(Page);
}