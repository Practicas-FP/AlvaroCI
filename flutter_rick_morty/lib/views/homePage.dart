import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/views/charactersPage.dart';
import 'package:flutter_rick_morty/views/episodesPage.dart';
import 'package:flutter_rick_morty/views/locationPage.dart';
import 'package:flutter_rick_morty/views/profilePage.dart';
import 'package:flutter_rick_morty/widgets/app_controller.dart';

import '../widgets/profile_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);
  @override
  State<HomePage> createState() => _HomePageState();
}

class Item {
  final String image;
  Item({required this.image});
}

class _HomePageState extends State<HomePage> {
  late final Item imgItem = Item(image: 'images/Rick_usa.jpg');
  final user = FirebaseAuth.instance.currentUser;

  Future signOut() async{
    await FirebaseAuth.instance.signOut();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: Column(
          children: [
            UserAccountsDrawerHeader(
              accountName: const Text('Rick & Morty'),
                accountEmail: Text(user?.email ?? 'Not logging'),
              currentAccountPicture: ClipRRect(
                  borderRadius: BorderRadius.circular(40),
                  child: Image.asset(user?.photoURL ?? imgItem.image ) ),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Home'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const HomePage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.group_sharp),
              title: const Text('Characters'),
              onTap: (){
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const CharactersPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.location_on_sharp),
              title: const Text('Locations'),
              onTap: (){
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const LocationPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.tv_sharp),
              title: const Text('Episodes'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const EpidosdesPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.change_history_sharp),
              title: const Text('Profile'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ProfilePage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.logout),
              title: const Text('Log Out'),
              onTap: signOut,
            ),
          ],
        ),
      ),
      appBar: AppBar(
        title: const Text('The Rick & Morty'),
        actions: const [CustomSwitch()],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 10,),
          const Expanded(
            flex: 2,
            child: CircleAvatar(
              radius: 135,
              backgroundImage: AssetImage("images/Rick_usa.jpg"),
            ),
          ),
          Expanded(
              flex: 3,
              child: Column(
                children: [
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const CharactersPage()),
                      );
                    },
                    child: const ProfileItem(
                      title: "View all the Characters",
                      icon: Icons.group_sharp,
                    ),
                  ),
                  GestureDetector(
                      onTap: ()  {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const LocationPage()),
                        );
                      },
                      child: const ProfileItem(
                          title: "View all the locations",
                          icon: Icons.location_on_sharp,
                      ),
                  ),
                  GestureDetector(
                    onTap: ()  {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const EpidosdesPage()),
                      );
                    },
                    child: const ProfileItem(
                      title: "View all the episodes",
                      icon: Icons.tv_sharp,
                    ),
                  ),
                  GestureDetector(
                      onTap: (){
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => const ProfilePage()),
                        );
                      },
                      child: const ProfileItem(
                        title: "View my profile",
                        icon: Icons.person_pin,
                      ))
                ],
              ))
        ],
      ),
    );
  }
}

class CustomSwitch extends StatelessWidget {
  const CustomSwitch({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Switch(
        value: AppController.instance.isDarkTheme,
        onChanged: (value) {
          AppController.instance.changeTheme();
        });
  }

}
