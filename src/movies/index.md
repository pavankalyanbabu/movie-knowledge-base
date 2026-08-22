---
layout: layout.njk
title: Film index
description: Browse every movie in the Reel Atlas.
permalink: /movies/
---

<section class="page-intro"><p class="eyebrow">The archive</p><h1>Film index</h1><p class="lede">Six starting points for your next great watch, from quiet character studies to full-scale spectacle.</p></section>
<section class="movie-grid">
{% for movie in collections.movies %}<a class="movie-card" href="{{ movie.url | url }}"><span class="card-number">{{ loop.index }}</span><p class="meta">{{ movie.data.year }} &nbsp; / &nbsp; {{ movie.data.category }}</p><h2>{{ movie.data.title }}</h2><p>{{ movie.data.excerpt }}</p><span class="arrow">↗</span></a>{% endfor %}
</section>