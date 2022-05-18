package com.android.marvel.services.model_characters

data class Comics(
    val available: Int,
    val collectionURI: String,
    val items: List<Item>,
    val returned: Int
)