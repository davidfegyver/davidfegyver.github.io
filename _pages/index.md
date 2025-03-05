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

<div id="playing">
</div>

## Friends

[\[dcs0\]](https://dcs0.hu/)


<script>
    const last_fm_user = "{{site.last_fm_user}}"
    const last_fm_api_key = "{{site.last_fm_api_key}}"

</script>
<script src="/assets/js/now-playing.js">