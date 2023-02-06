import 'dart:io';

import 'package:mason/mason.dart';
import 'package:mocktail/mocktail.dart';
import 'package:test/test.dart';

import '../pre_gen.dart';

class _MockHookContext extends Mock implements HookContext {}

void main() {
  group('PreGen Hook', () {
    late HookContext hookContext;
    late Map<String, dynamic> vars;

    setUp(() {
      vars = <String, dynamic>{};
      hookContext = _MockHookContext();
      when(() => hookContext.vars).thenReturn(vars);

      Directory.current = Directory.systemTemp;
    });

    test('keep the user input values', () {
      vars['project_title'] = 'MyTitle';
      vars['project_description'] = 'MyDescription';
      run(hookContext);

      expect(
        vars,
        equals(
          {
            'project_title': 'MyTitle',
            'project_description': 'MyDescription',
          },
        ),
      );
    });

    test('uses pubspec name and description when user input is empty', () {
      vars['project_title'] = '';
      vars['project_description'] = '';

      File('pubspec.yaml').writeAsStringSync(
        '''
name: PubspecTitle
description: PubspecDescription
''',
      );

      run(hookContext);

      expect(
        vars,
        equals(
          {
            'project_title': 'PubspecTitle',
            'project_description': 'PubspecDescription',
          },
        ),
      );
    });
  });
}
