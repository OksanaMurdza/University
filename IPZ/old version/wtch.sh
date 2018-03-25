
while inotifywait -q -e modify index.py working.py helper.py inputFile typeChecker.py; do
    python2.7 index.py
    echo '----'
done