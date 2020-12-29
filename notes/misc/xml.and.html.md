# SGML
Standard Generalized Markup Language is a standard for writing markup languages. Languages, such as XML, are considered to be children of SGML and follow similar rules.

tags - metadata (data about data), that defines what a piece of data is.
In SGML, we have a set of nested tags that define how the data within the document should be read.

## XML
eXtensible Markup Language
Is a child of SGML where the tags exist in that same tree structure and are of the form:
```xml
<bean>
    <type>Green</type>
    <name attr="Paul"/> <!-- Self closing tag -->
</bean>
```

### Well-formed XML
Well-formed XML is XML that is syntactically correct.
An example of XML that is not well-formed is XML where I have an open tag with no closing tag.
### Valid XML
Valid XML is XML that conforms to an attached schema, either attached as an XSD or a DTD. They define what tags are required to be in the document and which tags are allowed inside of what other tags. For example, we might have a document that defines what tags a Bean object is allowed to have, and if we put a `<cat>` tag inside of our `<bean>` that XML would no longer be valid.
#### DTD
Document Type Definition: An SGML document that defines what is valid XML.
#### XSD
XML Schema Definition: An XML document that defines what is valid XML.

## HTML
Hypertext Markup Language
Prior to HTML 5, HTML was a child language of SGML and therefore a sibling to XML. You will see similarities, however the language has broken off and is no longer an implementation of SGML.

The language of the web browser. The Web browser reads an html document creates a tree of the elements within, and then renders said tree on your screen. The tree that the browser creates is called the Document Object Model (DOM) (these are often used when parsing XML as well) and is the living representation of the page in the browser.

*Important*: When JavaScript modifies a web page, it does not modify the html document, rather it modifies the DOM.


### Containers
*Semantic* tags vs Div
Semantic tag is a tag that describes what it is. Almost all of these tags work exactly like a div does but describe what we're using them for.
* `<article>`
* `<aside>`
* `<details>`
* `<figcaption>`
* `<figure>`
* `<footer>`
* `<header>`
* `<main>`
* `<mark>`
* `<nav>`
* `<section>`
* `<summary>`
* `<time>`

It is best practice to utilize these semantic components when creating something that they could describe as that makes your html more readable. Previously we had to make do with something like `<div class="aside"></div>`