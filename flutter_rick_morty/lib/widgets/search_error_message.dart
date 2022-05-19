import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/common/text.dart';

class SearchErrorMessage extends StatelessWidget {
  final String errorMessage;

  const SearchErrorMessage({required this.errorMessage});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: Center(
        child: Text(errorMessage, style: AppTextStyle.headline),
      ),
    );
  }
}
