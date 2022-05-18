package com.android.marvel.services.repository

import com.android.marvel.domain.repository.MarvelRepository
import com.android.marvel.services.APIService
import com.android.marvel.services.model_characters.CharactersDTO
import javax.inject.Inject

class MarvelRepositoryImpl @Inject constructor(
    private val api:APIService):MarvelRepository{
    override suspend fun getAllCharacter(offset: Int): CharactersDTO {
        return api.getAllCharacters(offset = offset.toString())
    }

    override suspend fun getAllSearchedCharacter(search: String): CharactersDTO {
        return api.getAllSearchedCharacters(search=search)
    }
}