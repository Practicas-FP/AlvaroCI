// ignore_for_file: file_names
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/ui/widgets/profile_widget.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final userAuth = FirebaseAuth.instance.currentUser!;
  late String name = "h";
  late String name2 = "g";
  late var name3 = [];
  late String finalName = "Hii";
  late String email = userAuth.email.toString();


  @override
  // ignore: must_call_super
  void initState() {
    if(userAuth.displayName.toString().isEmpty){
      name = userAuth.displayName.toString();
    }else{
      name3 = email.split("@");
      name2 = name3[0];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue.shade300,
      appBar: AppBar(
        title: const Center(
          child: Text(
            "Universal Profile",
            textAlign: TextAlign.right,
          ),
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 10,),
          const Expanded(
            flex: 2,
            child: CircleAvatar(
              radius: 105,
              backgroundImage: AssetImage("assets/images/Rick_usa.jpg"),
            ),
          ),
          Expanded(
              flex: 3,
              child: Column(
                children: [
                  GestureDetector(
                    onTap: () {},
                    child: ProfileItem(
                      title: "Name: $name2" ,
                      icon: Icons.multitrack_audio_sharp,
                    ),
                  ),
                  GestureDetector(
                    onTap: () {},
                    child: ProfileItem(
                      title: "E-mail: $email" ,
                      icon: Icons.mail,
                    ),
                  ),
                  GestureDetector(
                      onTap: () {},
                      child: const ProfileItem(
                        title: "Change the profile pic",
                        icon: Icons.camera,
                      ))
                ],
              ))
        ],
      ),
    );
  }
}