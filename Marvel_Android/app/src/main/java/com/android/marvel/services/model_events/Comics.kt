package com.android.marvel.services.model_events

data class Comics(
    val available: String,
    val collectionURI: String,
    val items: List<ItemX>,
    val returned: String
)