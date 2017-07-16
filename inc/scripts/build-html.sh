#!/bin/bash


# measure script timing
time_start() {
  START=$(date +%s%3N)
}
time_end() {
  END=$(( $(date +%s%3N) - $START ))
}

# setup script variables
HTML="$BUILD/html/$BOOKNAME.html"

# remove previous build version
clean() {
  rm -f "$HTML"
}

# build html with pandoc
build_html() {
  echo "[+] now building html..."
  mkdir -p "$BUILD/html"
  pandoc --toc --toc-depth="$TOC_DEPTH" --self-contained --css="$CSS" --to=html -o "$HTML" "$TITLE" $SOURCE
}

# report script info and execution time
report() {
  sec_diff=$(($END / 1000))
  ms_hrs=$(printf "%02d" $(($sec_diff / 3600)))
  ms_min=$(printf "%02d" $((($sec_diff / 60) % 60)))
  ms_sec=$(printf "%02d" $(($sec_diff % 60)))
  ms_msec=$(printf "%03d" $(($END % 1000)))
  TOT_TIME="$ms_hrs:$ms_min:$ms_sec:$ms_msec"

  echo "Script $( basename $0 ) execution time: " "$TOT_TIME"
}

# get it done!
time_start
clean
build_html
time_end
report
