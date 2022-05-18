package com.android.marvel.ui.LogOut

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import com.android.marvel.AuthActivity
import com.android.marvel.R
import com.google.firebase.auth.FirebaseAuth

class LogOutFragment : Fragment() {
    private lateinit var btn_LogOut: Button
    companion object {
        fun newInstance() = LogOutFragment()
    }

    private lateinit var viewModel: LogOutViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        setup()
        return inflater.inflate(R.layout.logout_fragment, container, false)
    }

    private fun setup() {
        requireContext().let {
            val prefs = it.getSharedPreferences(getString(R.string.prefs_file), Context.MODE_PRIVATE).edit()
            prefs.clear()
            prefs.apply()

            FirebaseAuth.getInstance().signOut()
            it.startActivity(Intent(it, AuthActivity::class.java))
        }
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(LogOutViewModel::class.java)
        // TODO: Use the ViewModel
    }

}