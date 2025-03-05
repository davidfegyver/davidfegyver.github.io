---
layout: default
title: "daviiid's homepage"
permalink: /
---
{% assign birthdate = site.birthdate | date: '%s' %}
{% assign nowdate = 'now' | date: '%s' %}
{% assign diff = nowdate | minus: birthdate %}
{% assign diffYears = diff | divided_by: 3600 | divided_by: 24 | divided_by: 365 %}

# hi, im david

im a {{ diffYears | round: 0 }}yo student hunting for bugs in his free time

sometimes i make cool projects to github


## Friends

[\[dcs0\]](https://dcs0.hu/)