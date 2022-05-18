package com.android.marvel

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.preference.PreferenceManager
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import com.android.marvel.databinding.ActivityAuthBinding
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider

class AuthActivity : AppCompatActivity() {
    private val GOOGLE_SIGN_IN = 100
    private lateinit var txt_Email: EditText
    private lateinit var txt_Password: EditText
    private lateinit var btn_Register: Button
    private lateinit var btn_LogIn: Button
    private lateinit var btn_Google: Button
    private lateinit var authLayout: LinearLayout
    private lateinit var binding: ActivityAuthBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)
        //setContentView(R.layout.activity_auth)

        txt_Email = binding.editTextEmail
        txt_Password = binding.editTextPassword
        btn_Register = binding.btnRegister
        btn_LogIn = binding.btnSignIn
        btn_Google = binding.btnGoogle
        authLayout = binding.linearLayoutInputs

        //Analytics events
        val analytics = FirebaseAnalytics.getInstance(this)
        val bundleAnalytics = Bundle()
        bundleAnalytics.putString("message", "Firebase integration completed")
        analytics.logEvent("InitScreen", bundleAnalytics)

        //setup
        setUp()

        //session for watch if there are any session save
        session()
    }

    override fun onStart(){
        super.onStart()
        authLayout.visibility = View.VISIBLE
    }

    private fun session() {
        val prefs = getSharedPreferences(getString(R.string.prefs_file), Context.MODE_PRIVATE)
        val email: String? = prefs.getString("email", null)

        if (email != null){
            authLayout.visibility = View.INVISIBLE
            showHome(email)
        }
    }

    private fun setUp() {
        title = getString(R.string.title_AuthActivity)

        btn_Register.setOnClickListener {
            if (txt_Email.text.isNotEmpty() && txt_Password.text.isNotEmpty()){
                FirebaseAuth.getInstance()
                    .createUserWithEmailAndPassword(txt_Email.text.toString(), txt_Password.text.toString())
                    .addOnCompleteListener {
                        if (it.isSuccessful){
                            showHome(it.result?.user?.email ?: "")
                        }else{
                            showAlert()
                        }
                    }
            }
        }

        btn_LogIn.setOnClickListener {
            if (txt_Email.text.isNotEmpty() && txt_Password.text.isNotEmpty()){
                FirebaseAuth.getInstance()
                    .signInWithEmailAndPassword(txt_Email.text.toString(), txt_Password.text.toString())
                    .addOnCompleteListener {
                        if (it.isSuccessful){
                            showHome(it.result?.user?.email ?: "")
                        }else{
                            showAlert()
                        }
                    }
            }
        }

        btn_Google.setOnClickListener {
            val googleConf =
                GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                    .requestIdToken(getString(R.string.default_web_client_id))
                    .requestEmail()
                    .build()
            val googleClient = GoogleSignIn.getClient(this, googleConf)
            googleClient.signOut()
            startActivityForResult(googleClient.signInIntent, GOOGLE_SIGN_IN)
        }
    }

    private fun showHome(email: String){
        val homeIntent = Intent(this, MainActivity::class.java).apply{
            putExtra( "email", email)
        }
        val header =
        startActivity(homeIntent)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?){
        super.onActivityResult(requestCode, resultCode, data)
        if(requestCode == GOOGLE_SIGN_IN){ println( GoogleSignIn.getSignedInAccountFromIntent(data))
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)

            try {
                val account = task.getResult(ApiException::class.java)
                if(account != null){
                    val credential = GoogleAuthProvider.getCredential(account.idToken, null)
                    FirebaseAuth.getInstance().signInWithCredential(credential).addOnCompleteListener {
                        if (it.isSuccessful){
                            showHome(account.email ?: "")
                        }else{
                            showAlert ()
                        }
                    }
                }
            }catch (e: ApiException){
                showAlert()
            }
        }
    }

    private fun showAlert() {
        val builder= AlertDialog.Builder( this)
        builder.setTitle ("Error")
        builder.setMessage("Error with the authentication. Please, try later.")
        builder.setPositiveButton("Okay",  null)
        val dialog: AlertDialog=builder.create()
        dialog. show()
    }
}