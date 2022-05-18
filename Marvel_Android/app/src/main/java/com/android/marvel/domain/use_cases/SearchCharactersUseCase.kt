package com.android.marvel.domain.use_cases

import com.android.marvel.domain.repository.MarvelRepository
import com.android.marvel.services.util.Response
import com.android.marvel.domain.models.Character
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import java.io.IOException
import javax.inject.Inject

class SearchCharactersUseCase @Inject constructor(
    private val repository: MarvelRepository
) {
    operator fun invoke(search:String): Flow<Response<List<Character>>> = flow{
        try{
            emit(Response.Loading<List<Character>>())
            val list = repository.getAllSearchedCharacter(search).data.results.map{
                it.toCharacter()
            }
            emit(Response.Success<List<Character>>(list))
        }
        catch (e:HttpException){
            emit(Response.Error<List<Character>>(e.printStackTrace().toString()))
        }
        catch (e:IOException){
            emit(Response.Error<List<Character>>(e.printStackTrace().toString()))
        }
    }
}