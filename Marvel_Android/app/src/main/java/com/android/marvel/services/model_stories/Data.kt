package com.android.marvel.services.model_stories

data class Data(
    val count: String,
    val limit: String,
    val offset: String,
    val results: List<Result>,
    val total: String
)