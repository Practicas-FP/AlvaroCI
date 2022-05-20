import 'package:flutter_rick_morty/repository/model/character_model.dart';

abstract class CharacterService {
  Future<List<CharacterModel>> getAllCharacters(int page);
}
