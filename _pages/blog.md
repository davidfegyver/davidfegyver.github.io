---
layout: default
title: "daviiid's blog"
permalink: /blog/
---

# Blogposts

{% for post in site.posts %}

## [{{post.title}}]({{site.baseurl}}{{post.url}})

{{post.description}} 

<small>
    <b>{{post.date | date_to_string}}</b>
    {% for tag in post.tags %}, {{tag}} {% endfor %} 
</small>


{% endfor %}
