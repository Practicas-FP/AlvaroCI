package com.android.marvel.services.model_creators

data class Comics(
    val available: String,
    val collectionURI: String,
    val items: List<Item>,
    val returned: String
)