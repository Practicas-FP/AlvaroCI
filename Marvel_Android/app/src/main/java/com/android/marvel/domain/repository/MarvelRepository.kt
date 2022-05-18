package com.android.marvel.domain.repository

import com.android.marvel.services.model_characters.CharactersDTO

interface MarvelRepository {
    suspend fun getAllCharacter(offset:Int):CharactersDTO
    suspend fun getAllSearchedCharacter(search:String):CharactersDTO
}