package com.android.marvel.services.model_characters

data class Series(
    val available: Int,
    val collectionURI: String,
    val items: List<ItemXX>,
    val returned: Int
)