package com.android.marvel.services.model_creators

data class Events(
    val available: String,
    val collectionURI: String,
    val items: List<ItemX>,
    val returned: String
)