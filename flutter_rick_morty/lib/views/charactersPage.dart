import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/common/app_colors.dart';
import 'package:flutter_rick_morty/widgets/characters.dart';
import 'package:flutter_rick_morty/widgets/custom_search_delegate.dart';
import 'package:flutter_rick_morty/widgets/custom_sliver_app_bar.dart';

final ScrollController scrollController = ScrollController();

class CharactersPage extends StatefulWidget{
  const CharactersPage({Key? key}) : super(key: key);

  @override
  State<CharactersPage> createState() => _CharactersPageState();
}

class _CharactersPageState extends State<CharactersPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButtonLocation: FloatingActionButtonLocation.miniEndTop,
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppColors.mainBackground,
        mini: true,
        onPressed: () {
          showSearch(context: context, delegate: CustomSearchDelegate());
        },
        child: const Icon(Icons.search, color: Colors.white),
      ),
      body: CustomScrollView(
        controller: scrollController,
        slivers: [
          SliverPersistentHeader(
            delegate: CustomSliverAppBar(expandedHeight: 200),
            pinned: true,
          ),
          const CharactersClass(),
        ],
      ),
    );
  }
}