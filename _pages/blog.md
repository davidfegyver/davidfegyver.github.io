---
layout: default
title: "daviiid's blog"
permalink: /blog/
---

<h1>Blogposts</h1>

{% for post in site.posts %}

<div class="listitem_post">

<a href="{{site.baseurl}}{{post.url}}" class="listitem_post_title">{{post.title}}</a>

<p class="listitem_post_description">{{post.description}}</p>

<p class="listitem_post_date">{{post.date | date: "%-d %B %Y" }}</p>

</div>
{% endfor %}
