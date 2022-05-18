package com.android.marvel.ui.characters

import android.content.Context
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.view.*
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.appcompat.widget.SearchView
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.marvel.R
import com.android.marvel.databinding.CharactersFragmentBinding
import com.android.marvel.domain.models.Character
import com.android.marvel.services.util.CharacterListAdapter
import com.android.marvel.services.util.characterList.CharacterViewModel
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

@AndroidEntryPoint
class CharactersFragment: Fragment(), SearchView.OnQueryTextListener {
    companion object {
        fun newInstance() = CharactersFragment()
    }
    private lateinit var searchTerm: String
    private lateinit var binding: CharactersFragmentBinding
    private val viewModel: CharacterViewModel by viewModels()
    var flag = 3
    var paginatedValue = 0
    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: CharacterListAdapter
    private lateinit var layoutManager: GridLayoutManager
    private val tempList = arrayListOf<Character>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        println("parte 1 ok")
        binding = CharactersFragmentBinding.inflate(inflater, container, false)
        val root: View = binding.root
        return root
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        binding = CharactersFragmentBinding.inflate(layoutInflater)
        recyclerView = binding.charactersRecyclerView
        println("parte 2 ok")
        requireContext().let {
            layoutManager = GridLayoutManager(it, 2)
            println("parte 3 ok")
        }
        recyclerViewCharacters()
        binding.btSort.setOnClickListener {
            //tempList.sortWith()
            adapter.setData(tempList)
            println("pruebaaaaaaaaaaaaaa $tempList")
        }
        println("parte 5 ok")
        recyclerView.addOnScrollListener(object:RecyclerView.OnScrollListener(){
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                super.onScrollStateChanged(recyclerView, newState)
                if(layoutManager.findLastVisibleItemPosition()==layoutManager.itemCount-1)
                {
                    println("parte 6 ok")
                    paginatedValue += 20
                    viewModel.getAllCharactersData(paginatedValue)
                    callApi()
                }
            }
        })
        // TODO: Use the ViewModel
    }

    private fun callApi() {
        println("parte 7 ok")
        CoroutineScope(Dispatchers.Main).launch{
            repeat(flag){
                viewModel._marvelValue.collect {
                    when{
                        it.isLoading ->{
                            binding.progressBar.visibility = View.VISIBLE
                            println("parte 7.1 ok")
                        }
                        it.error.isNotBlank() ->{
                            binding.progressBar.visibility = View.GONE
                            flag = 0
                            println("parte 7.2 ok")
                            //Toast.makeText(this@CharactersFragment,it.error,Toast.LENGTH_LONG).show()
                        }
                        it.characterList.isNotEmpty() ->{
                            println("parte 7.3 ok")
                            binding.progressBar.visibility = View.GONE
                            flag = 0
                            tempList.addAll(it.characterList)
                            adapter.setData(it.characterList as ArrayList<Character>)
                        }
                    }
                    delay(1000)
                }
            }
        }
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater){
        inflater.inflate(R.menu.main,menu)
        val search = menu.findItem(R.id.menuSearch)
        val searchView = search?.actionView as SearchView
        searchView.isSubmitButtonEnabled = true
        searchView.setOnQueryTextListener(this)
    }

    private fun recyclerViewCharacters() {
        println("parte 4 ok")
        recyclerView = binding.charactersRecyclerView
        requireContext().let {
            adapter = CharacterListAdapter(it, ArrayList())
        }
        recyclerView.layoutManager = layoutManager
        recyclerView.adapter = adapter
    }

    override fun onQueryTextSubmit(query: String?): Boolean {
        if(query!=null){
            println("parte S.1 ok $query")
            searchTerm = query
        }
        if (searchTerm.isNotEmpty()){
            println("parte S.2 ok")
            search()
        }
        return true
    }

    override fun onQueryTextChange(newText: String?): Boolean {
        if(newText!=null){
            println("parte S.C.1 ok $newText")
            searchTerm = newText
        }
        if (searchTerm.isNotEmpty()){
            println("parte S.C.2 ok")
            search()
        }
        return true
    }

    private fun search() {
        println("parte search")
        viewModel.getAllSearchedCharacterData(searchTerm)
        CoroutineScope(Dispatchers.Main).launch {
            viewModel._marvelValue.collect{ it ->
                when{
                    it.isLoading ->{
                        binding.progressBar.visibility = View.VISIBLE
                    }
                    it.error.isNotBlank() ->{
                        binding.progressBar.visibility = View.GONE

                    }
                    it.characterList.isNotEmpty() ->{
                        binding.progressBar.visibility = View.GONE
                        adapter.setData(it.characterList as ArrayList<Character>)
                    }
                }
            }
        }
    }

    override fun onStart() {
        super.onStart()
        viewModel.getAllCharactersData(paginatedValue)
        callApi()
    }

}

