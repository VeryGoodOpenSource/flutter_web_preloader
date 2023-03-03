import 'dart:io';

import 'package:mason/mason.dart';
import 'package:yaml/yaml.dart';

void run(HookContext context) {
  final title = context.vars['project_title'] as String;
  final description = context.vars['project_description'] as String;

  if (title.isEmpty || description.isEmpty) {
    final pubspecFile = File('pubspec.yaml');
    if (pubspecFile.existsSync()) {
      final pubspec = loadYaml(pubspecFile.readAsStringSync()) as YamlMap;

      final pubspecTitle = pubspec['name']?.toString();
      final pubspecDescription = pubspec['description']?.toString();

      context.vars['project_title'] = title.isEmpty ? pubspecTitle : title;
      context.vars['project_description'] =
          description.isEmpty ? pubspecDescription : description;
    }
  }
}
