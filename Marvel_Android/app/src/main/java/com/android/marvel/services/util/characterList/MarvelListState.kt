package com.android.marvel.services.util.characterList

import com.android.marvel.domain.models.Character

data class MarvelListState(
    val isLoading: Boolean = false,
    val characterList: List<Character> = emptyList(),
    val error: String = ""
)
