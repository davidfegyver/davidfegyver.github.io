---
layout: default
title: "daviiid's Socials"
permalink: /socials/
---

# Socials

Reach me via socials:

<ul>
  {% for link in site.socials %}
  {% assign url_parts = link | split: '/'  %}
  {% assign domain_parts = url_parts[2] | split: '.'  %}
    <li><a href="{{ link }}" target="_blank">[{{ domain_parts[0]  }}]</a></li>
  {% endfor %}
</ul>