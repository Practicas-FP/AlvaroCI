import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:flutter_rick_morty/common/app_colors.dart';

class LoadingGrid extends StatelessWidget {
  const LoadingGrid({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
        padding: const EdgeInsets.all(20),
        sliver: SliverGrid(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            childAspectRatio: 0.48,
            mainAxisSpacing: 10.0,
            crossAxisSpacing: 10.0,
            crossAxisCount: 2,
          ),
          delegate: SliverChildBuilderDelegate(
            (BuildContext context, int index) {
              return Shimmer.fromColors(
                baseColor: AppColors.cellBackground,
                highlightColor: Colors.grey[100]!,
                child: Container(
                  height: 90,
                  width: 40,
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              );
            },
            childCount: 4,
          ),
        ));
  }
}
