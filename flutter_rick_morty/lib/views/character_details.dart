import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/common/app_colors.dart';
import 'package:flutter_rick_morty/common/text.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';
import 'package:flutter_rick_morty/widgets/cache_image.dart';

class CharacterDetails extends StatelessWidget {
  final CharacterEntity character;

  const CharacterDetails({required this.character});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 50,
        backgroundColor: AppColors.cellBackground,
        title: const Text(
          'Character Info',
          style: AppTextStyle.title,
        ),
        centerTitle: true,
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(character.name, style: AppTextStyle.headline),
              Container(
                margin: EdgeInsets.only(top:5),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(10)),
                child: CacheImage(
                  imageUrl: character.image,
                  width: 165,
                  height: 165,
                  isRounded: true,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    height: 10,
                    width: 10,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      color: character.status == 'Alive'
                          ? Colors.green
                          : character.status == 'Dead'
                          ? Colors.red
                          : Colors.grey,
                    ),
                  ),
                  const SizedBox(width: 5),
                  Text('${character.status == 'unknown' ? 'Unknown' : character.status}', style: AppTextStyle.title),
                ],
              ),
              const SizedBox(height:15),
              const Text('Gender', style: AppTextStyle.caption),
              Text(character.gender, style: AppTextStyle.title),
              const SizedBox(height:10),

              const Text('Species', style: AppTextStyle.caption),
              Text(character.species, style: AppTextStyle.title),
              const SizedBox(height:10),

              const Text('Last known location', style: AppTextStyle.caption),
              Text('${character.location.name == 'unknown' ? 'Uknown' : character.location.name}', style: AppTextStyle.title),
              const SizedBox(height:10),

              const Text('Origin', style: AppTextStyle.caption),
              Text('${character.origin.name == 'unknown' ? 'Uknown' : character.origin.name}', style: AppTextStyle.title),
              const SizedBox(height:10),
              const Text('Number of episodes', style: AppTextStyle.caption),
              Text('${character.episode.length}', style: AppTextStyle.title),
            ],
          ),
        ),
      ),
    );
  }
}