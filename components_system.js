function CreateElement (Type, Class, InnerHtml)
{
	let Result = document.createElement(Type);
	Result.className = Class;
	Result.innerHTML = InnerHtml;
	return Result;
}

function CreateEmptyElement (Type, Class)
{
	return CreateElement(Type, Class, "");
}

function AppendExistingChild (Parent, Child)
{
	Parent.appendChild(Child);
	return Child;
}

function AppendChild (Parent, Type, Class, Contents)
{
	let Child = document.createElement(Type);
	Child.className = Class;
	Child.innerHTML = Contents;
	return AppendExistingChild(Parent, Child);
}

function AppendChildLink (Parent, Class, Destination, Contents)
{
	let Link = AppendChild(Parent, "a", Class, Contents);
	Link.href = Destination;
	return Link;
}

function SetOnClick (Element, OnClick)
{
	Element.onclick = OnClick;
	return Element;
}
