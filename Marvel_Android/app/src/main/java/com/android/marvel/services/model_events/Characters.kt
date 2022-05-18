package com.android.marvel.services.model_events

data class Characters(
    val available: String,
    val collectionURI: String,
    val items: List<Item>,
    val returned: String
)