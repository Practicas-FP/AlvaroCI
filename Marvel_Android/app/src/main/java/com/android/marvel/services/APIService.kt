package com.android.marvel.services

import com.android.marvel.services.model_characters.CharactersDTO
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Url
import com.android.marvel.services.model_comics.comics
import com.android.marvel.services.util.Constants
import retrofit2.http.Query

interface APIService {
    @GET("/v1/public/characters")
    suspend fun getAllCharacters(
        @Query("apikey")apikey:String = Constants.API_KEY,
        @Query("ts")ts:String = Constants.timeStamp,
        @Query("hash")hash:String = Constants.hash(),
        @Query("offset")offset:String
    ):CharactersDTO

    @GET("/v1/public/characters")
    suspend fun getAllSearchedCharacters(
        @Query("apikey")apikey:String = Constants.API_KEY,
        @Query("ts")ts:String = Constants.timeStamp,
        @Query("hash")hash:String = Constants.hash(),
        @Query("nameStart")search: String
    ):CharactersDTO
}