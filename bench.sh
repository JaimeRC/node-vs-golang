#!/bin/bash

# TEST 0
declare -A test0=(
    [requests]=100
    [concurrent]=1
    [name]='test0'
)

# TEST 1
declare -A test1=(
    [requests]=1000
    [concurrent]=100
    [name]='test1'
)

# TEST 2
declare -A test2=(
    [requests]=10000
    [concurrent]=1000
    [name]='test1'
)

# Get configuration of the Server
if [ "$1" = "golang" ]; then
    URL="http://localhost:8080/api"
    OUTFILE="output_golang.txt"
    LANGUAGE="golang"
else
    URL="http://localhost:7070/api"
    OUTFILE="output_node.txt"
    LANGUAGE="node"
fi

DIVIDER="\n=============================================================================================================\n"

# Create file
rm -f $OUTFILE
touch $OUTFILE

echo "Benching: $URL"
echo "Benching: $URL" >> $OUTFILE

launch_test () {

    # First line in the file, use > so we overwrite then >> so we append
    echo "'$2' concurrent user doing '$1' page hits" >> $OUTFILE

    echo "This shows you how well the web-server will handle a simple load of '$2' user doing a number of page loads." >> $OUTFILE

    # Newline spacer
    echo -e "" >> $OUTFILE

    # Launch Test
    ab -l -r -n $1 -c $2 -k -H "Accept-Encoding: gzip, deflate" -g $3.csv $URL/test >> $OUTFILE

    # Add the divider so we can read this easier
    echo -e $DIVIDER >> $OUTFILE
}

print_graphic () {
    echo "
        set terminal png size 600
        set output '$1.png'
        set title '1000 requests, 100 concurrent requets'
        set size ratio 0.6
        set grid y
        set xlabel 'Nº Requests'
        set ylabel 'Response time (ms)'
        plot '$1.csv' using 9 smooth sbezier with lines title '$URL'" >> "$1.plot"

    gnuplot "$1.plot"

    rm -f "$1.plot" "$1.csv"
}

declare -n test
for test in ${!test@}; do
   launch_test ${test[requests]} ${test[concurrent]} "${LANGUAGE}_${test[name]}"
   print_graphic "${LANGUAGE}_${test[name]}"
   sleep 3
done

echo "Bench Complete."
