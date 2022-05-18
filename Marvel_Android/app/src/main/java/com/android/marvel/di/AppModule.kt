package com.android.marvel.di

import com.android.marvel.domain.repository.MarvelRepository
import com.android.marvel.services.APIService
import com.android.marvel.services.repository.MarvelRepositoryImpl
import com.android.marvel.services.util.Constants
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    @Singleton
    fun provideMarvelApi():APIService{
        return Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(APIService::class.java)
    }
    @Provides
    @Singleton
    fun provideMarvelRepository(api:APIService):MarvelRepository{
        return MarvelRepositoryImpl(api)
    }
}