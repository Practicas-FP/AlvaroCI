package com.android.marvel.services.model_characters

data class Data(
    val count: Int,
    val limit: Int,
    val offset: Int,
    val results: List<Result>,
    val total: Int
)