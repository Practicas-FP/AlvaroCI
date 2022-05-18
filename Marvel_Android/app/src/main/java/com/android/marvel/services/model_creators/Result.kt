package com.android.marvel.services.model_creators

data class Result(
    val comics: Comics,
    val events: Events,
    val firstName: String,
    val fullName: String,
    val id: String,
    val lastName: String,
    val middleName: String,
    val modified: String,
    val resourceURI: String,
    val series: Series,
    val stories: Stories,
    val suffix: String,
    val thumbnail: Thumbnail,
    val urls: List<Url>
)