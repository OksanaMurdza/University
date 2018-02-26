
while inotifywait -q -e modify index.py working.py typeChecker.py; do
    python2.7 index.py
    echo '----'
done