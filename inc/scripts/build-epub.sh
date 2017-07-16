#!/bin/bash


# measure script timing
time_start() {
  START=$(date +%s%3N)
}
time_end() {
  END=$(( $(date +%s%3N) - $START ))
}

# setup script variables
EPUB="$BUILD/epub/$BOOKNAME.epub"

# remove previous build version
clean() {
  rm -f "$EPUB"
}

# build epub with pandoc
build_epub() {
  echo "[+] now building epub..."
  # create epub dir if it does not exist
  mkdir -p "$BUILD/epub"

  # build the ebook with defined parameters
  pandoc --smart \
    --read=markdown-implicit_figures \
    --write=epub \
    --self-contained \
    --epub-chapter-level=1 \
    --template="$TEMPLATE_EPUB" \
    --extract-media="$IMAGES" \
    --epub-metadata="$METADATA" \
    --epub-embed-font="$FONTS" \
    --epub-cover-image="$COVER_IMAGE" \
    --epub-stylesheet="$CSS" \
    -o "$EPUB" "$TITLE" $SOURCE
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
build_epub
time_end
report
