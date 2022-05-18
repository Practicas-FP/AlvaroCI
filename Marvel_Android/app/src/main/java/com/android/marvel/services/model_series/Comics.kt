package com.android.marvel.services.model_series

data class Comics(
    val available: String,
    val collectionURI: String,
    val items: List<ItemX>,
    val returned: String
)