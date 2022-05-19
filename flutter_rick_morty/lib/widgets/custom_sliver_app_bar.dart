import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/common/app_colors.dart';
import 'package:flutter_rick_morty/common/text.dart';

class CustomSliverAppBar extends SliverPersistentHeaderDelegate {
  final double expandedHeight;

  CustomSliverAppBar({required this.expandedHeight});

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Stack(
      fit: StackFit.expand,
      //clipBehavior: Clip.antiAlias,
      children: [
        const Image(
          image: AssetImage('assets/images/rick_and_morty.png'),
          fit: BoxFit.cover,
        ),
        Opacity(
          opacity: shrinkOffset / expandedHeight,
          child: Container(
            decoration: const BoxDecoration(
              color: AppColors.cellBackground,
            ),
          ),
        ),
        Center(
          child: Opacity(
            opacity: shrinkOffset / expandedHeight,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: const [
                Text(
                  'Rick & Morty Catalog',
                  style: AppTextStyle.headline,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  @override
  double get maxExtent => expandedHeight;

  @override
  double get minExtent => kToolbarHeight;

  @override
  bool shouldRebuild(SliverPersistentHeaderDelegate oldDelegate) => true;
}
