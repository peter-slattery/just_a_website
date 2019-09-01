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

function CreateContentsSection (Sections)
{
	let Contents = CreateEmptyElement("div", "contents");
	for (let i = 0; i < Sections.length; i++)
	{
		let Section = Sections[i];
		if (Section.Title != undefined && Section.Title != null && Section.Title != "")
		{
			AppendChild(Contents, "div", "subtitle", Section.Title);
		}
		if (Section.Body != undefined && Section.Body != null && Section.Body != "")
		{
			AppendChild(Contents, "div", "text", Section.Body);
		}
		if (Section.Image != undefined && Section.Image != null && Section.Image != "")
		{
			AppendExistingChild(Contents, CreateImage(Section.Image));
		}
		if (Section.Video != undefined && Section.Video != null && Section.Video != "")
		{
			AppendExistingChild(Contents, CreateVideo(Section.Video));
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

	let AboutBtn = AppendChildLink(Nav, "button", "\\index.html", "About | Work");
	let SketchbookBtn = AppendChildLink(Nav, "button", "\\sketchbook.html", "Sketchbook");
	let BlogBtn = AppendChildLink(Nav, "button", "\\blog.html", "Blog");

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