import os
import shutil
import glob
import sys
import json
import re


def staticFilesToJs():
    srcDir = os.path.dirname(os.path.realpath(__file__))
    output = open(os.path.join(srcDir, 'TemplateMap.js'), 'w+')
    output.write('define(function() {\n    return {\n')
    count = 0
    for name in os.listdir(srcDir):
        if not name.endswith('.html'):
            continue

        filePath = os.path.join(srcDir, name)
        if not os.path.exists(filePath):
            print  filePath + ' not exists'
            continue
        f = open(filePath)
        str = f.read()
        f.close()

        if count > 0:
            output.write(',\n\n')

        output.write("        '" + name + "' : '")
        str = str.replace('\r\n', '')
        str = str.replace('\n', '')
        str = str.replace('\t', ' ')
        str = str.replace("'", "\\'")
        output.write(str)
        output.write("'")
        count = count + 1

    output.write('''
    };
});
''')
    output.close()


if __name__ == '__main__':
    staticFilesToJs()