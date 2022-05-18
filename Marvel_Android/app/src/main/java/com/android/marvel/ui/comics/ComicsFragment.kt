package com.android.marvel.ui.comics

import android.app.AlertDialog
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.marvel.R
import com.android.marvel.databinding.ComicsFragmentBinding
import com.android.marvel.services.APIService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ComicsFragment : Fragment() {

    companion object {
        fun newInstance() = ComicsFragment()
    }

    private lateinit var viewModel: ComicsViewModel
    private lateinit var binding:ComicsFragmentBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.comics_fragment, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        binding = ComicsFragmentBinding.inflate(layoutInflater)
        viewModel = ViewModelProvider(this)[ComicsViewModel::class.java]
        // TODO: Use the ViewModel
    }

    private fun showAlert() {
        requireContext().let {
            val builder= AlertDialog.Builder(it)
            builder.setTitle ("Error")
            builder.setMessage("Error loading the Comics. Please, try later.")
            builder.setPositiveButton("Okay",  null)
            val dialog: AlertDialog =builder.create()
            dialog.show()
        }

    }
}