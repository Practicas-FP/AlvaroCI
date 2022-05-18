import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/app_controller.dart';

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
  late final Item imgItem = Item(image: 'assets/images/Logo_de_Los_Vengadores.png');
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
                if (kDebugMode) {
                  print('home');
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.movie_filter_rounded),
              title: const Text('Movies'),
              onTap: (){
                if (kDebugMode) {
                  print('comics');
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.account_box_sharp),
              title: const Text('Characters'),
              onTap: (){
                if (kDebugMode) {
                  print('comics');
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.book_online_sharp),
              title: const Text('Comics'),
              onTap: () {
                if (kDebugMode) {
                  print('comics');
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.accessibility),
              title: const Text('Creators'),
              onTap: () {
                if (kDebugMode) {
                  print('creators');
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.account_balance_outlined),
              title: const Text('Events'),
              onTap: () {
                if (kDebugMode) {
                  print('event');
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.tv_sharp),
              title: const Text('Series'),
              onTap: () {
                if (kDebugMode) {
                  print('series');
                }
              },
            ),
            ListTile(
              leading: const Icon(Icons.auto_stories),
              title: const Text('Stories'),
              onTap: () {
                if (kDebugMode) {
                  print('stories');
                }
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
