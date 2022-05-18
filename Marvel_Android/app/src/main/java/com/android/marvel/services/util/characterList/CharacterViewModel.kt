package com.android.marvel.services.util.characterList

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.android.marvel.domain.use_cases.CharacterUserCase
import com.android.marvel.domain.use_cases.SearchCharactersUseCase
import com.android.marvel.services.util.Response
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CharacterViewModel @Inject constructor(
    private val charactersUseCase: CharacterUserCase,
    private val searchCharactersUseCase: SearchCharactersUseCase
): ViewModel(){
    private val marvelValue = MutableStateFlow(MarvelListState())
    var _marvelValue: StateFlow<MarvelListState> = marvelValue

    fun getAllCharactersData(offset:Int) = viewModelScope.launch(Dispatchers.IO) {
        charactersUseCase(offset = offset).collect {
            when(it){
                is Response.Success ->{
                    marvelValue.value = MarvelListState(characterList = it.data?: emptyList())
                }
                is Response.Loading ->{
                    marvelValue.value = MarvelListState(isLoading = true)
                }
                is Response.Error ->{
                    marvelValue.value = MarvelListState(error = it.message?:"An unexpected error ocurred.")
                }
            }
        }
    }

    fun getAllSearchedCharacterData(search:String)=viewModelScope.launch(Dispatchers.IO) {
        searchCharactersUseCase.invoke(search = search).collect {
            when(it){
                is Response.Success ->{
                    marvelValue.value = MarvelListState(characterList = it.data?: emptyList())
                }
                is Response.Loading ->{
                    marvelValue.value = MarvelListState(isLoading = true)
                }
                is Response.Error ->{
                    marvelValue.value = MarvelListState(error = it.message?:"An unexpected error ocurred.")
                }
            }
        }
    }
}