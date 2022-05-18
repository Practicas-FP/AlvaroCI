import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  Future signIn() async{
    await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim()
    );
  }

  @override
  void dispose(){
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[300],
        body: SafeArea(
            child: Center(
              child: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                        Icons.flash_on_sharp,
                      size: 100,
                    ),
                    const SizedBox(height: 10,),
                  // Hello again!
                   const Text(
                    'Hello Morty!',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                    ), // TextStyle
                  ),
                   const SizedBox(height: 10,),
                   const Text(
                    'Rick needs you for other adventure!',
                    style: TextStyle(
                      fontSize: 20,
                    ), // TextStyle
                  ),
                   const SizedBox(height: 20,),

                  //email text
                  Padding(
                    padding:  const EdgeInsets.symmetric(horizontal: 25.0),
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.grey,
                        border: Border.all(color: Colors.white),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Padding(
                          padding: const EdgeInsets.only(left: 20.0),
                          child: TextField(
                            controller: _emailController,
                            decoration: const InputDecoration(
                              border: InputBorder.none,
                              hintText: 'Email@gmail.com',
                            ),
                          )),
                    ),
                  ),
                   const SizedBox(height: 10,),
                  //password text
                  Padding(
                    padding:  const EdgeInsets.symmetric(horizontal: 25.0),
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.grey,
                        border: Border.all(color: Colors.white),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Padding(
                          padding: const EdgeInsets.only(left: 20.0),
                          child: TextField(
                            controller: _passwordController,
                            obscureText: true,
                            decoration: const InputDecoration(
                              border: InputBorder.none,
                              hintText: '**********',
                            ),
                          )),
                    ),
                  ),
                   const SizedBox(height: 20,),
                  //btn sig in
                  Padding(
                    padding:  const EdgeInsets.symmetric(horizontal: 25.0),
                    child: GestureDetector(
                      onTap: signIn,
                      child: Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: Colors.deepPurple,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child:  const Center(
                          child: Text(
                            'Sign In',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                    const SizedBox(height: 20,),
                    Padding(
                      padding:  const EdgeInsets.symmetric(horizontal: 25.0),
                      child: GestureDetector(
                        onTap: (){signInWithGoogle(context);},
                        child: Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child:  const Center(
                            child: Text(
                              'Google',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                   const SizedBox(height: 20,),
                  // not a member? register now
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children:  const [
                      Text(
                        'Not a member?',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        ), // TextStyle
                      ), // Text
                      Text(
                        'Register now',
                        style: TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ), // TextStyle
                      ), // Text
                    ],
                  ), // Row

                ],
              ),

                ),
            ),
        ),
    );
  }

  Future<void> signInWithGoogle(BuildContext context) async{
    try {
      if (kIsWeb) {
        GoogleAuthProvider googleProvider = GoogleAuthProvider();

        googleProvider
            .addScope('https://www.googleapis.com/auth/contacts.readonly');

        await FirebaseAuth.instance.signInWithPopup(googleProvider);
      } else {
        final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

        final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;

        if (googleAuth?.accessToken != null && googleAuth?.idToken != null) {
          // Create a new credential
          final credential = GoogleAuthProvider.credential(
            accessToken: googleAuth?.accessToken,
            idToken: googleAuth?.idToken,
          );
          UserCredential userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);

          // if you want to do specific task like storing information in firestore
          // only for new users using google sign in (since there are no two options
          // for google sign in and google sign up, only one as of now),
          // do the following:

          if (userCredential.user != null) {
            if (userCredential.additionalUserInfo!.isNewUser) {}
          }
        }
      }
    } on FirebaseAuthException catch (e) {
      debugPrintStack(label: e.message!); // Displaying the error message
    }
  }
}
