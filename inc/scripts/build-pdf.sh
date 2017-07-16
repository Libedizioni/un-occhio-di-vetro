#!/bin/bash

# measure script timing
time_start() {
  START=$(date +%s%3N)
}
time_end() {
  END=$(( $(date +%s%3N) - $START ))
}

# setup script variables
LATEX_ENGINE='xelatex'
#LATEX_ENGINE='lualatex'
#LATEX_ENGINE='pdflatex'
PDF="$BUILD/pdf/$BOOKNAME.pdf"
EPUB_SRC="$BUILD/epub/$BOOKNAME.epub"
EPUB="$BUILD/pdf/$BOOKNAME.epub"
ZIP="$BUILD/pdf/$BOOKNAME.zip"
CURR_DATE=$(date +"%Y")

# remove previous build version
clean() {
  rm -f "$PDF"
}

# build pdf with LaTex Pandoc template
build_pdf_latex() {
  echo "[+] now building pdf..."
  mkdir -p "$BUILD/pdf"
  # --variable mainfont='Raleway-Regular' \
  # --variable documentclass="$LATEX_CLASS" \
  pandoc --toc --toc-depth="$TOC_DEPTH" --latex-engine=$LATEX_ENGINE \
  --template="$TEMPLATE_PDF" \
  -o "$PDF" "$TITLE" $SOURCE
}

# build pdf with Calibre ebook-convert cli
build_pdf_calibre() {
  echo "[+] now building pdf..."
  # create pdf dir if it does not exist
  mkdir -p "$BUILD/pdf"

  cp "$EPUB_SRC" "$EPUB"
  mv "$EPUB" "$ZIP"
  unzip -d "$BUILD/pdf/$BOOKNAME" "$ZIP"
  if [ ! -z $ISBN_PDF ]; then
    sed -i "s/$ISBN_EPUB/$ISBN_PDF/g" "$BUILD/pdf/$BOOKNAME/ch002.xhtml"
    sed -i "s/$ISBN_EPUB/$ISBN_PDF/g" "$BUILD/pdf/$BOOKNAME/content.opf"
    sed -i "s/$ISBN_EPUB/$ISBN_PDF/g" "$BUILD/pdf/$BOOKNAME/toc.ncx"
  else
    sed -i "s/ISBN $ISBN_EPUB//g" "$BUILD/pdf/$BOOKNAME/ch002.xhtml"
    sed -i "s/ISBN $ISBN_EPUB//g" "$BUILD/pdf/$BOOKNAME/content.opf"
    sed -i "s/ISBN $ISBN_EPUB//g" "$BUILD/pdf/$BOOKNAME/toc.ncx"
  fi
  rm "$ZIP"
  cd "$BUILD/pdf/$BOOKNAME"
  zip -r "../$BOOKNAME.zip" *
  cd ../../..
  mv "$ZIP" "$EPUB"
  rm -rf "$BUILD/pdf/$BOOKNAME"

  ebook-convert "$EPUB" "$PDF" \
    --unit millimeter \
    --custom-size 120x170 \
    --preserve-cover-aspect-ratio \
    --base-font-size 10 \
    --margin-bottom 20 \
    --margin-left 30 \
    --margin-right 30 \
    --margin-top 25 \
    --authors "$AUTHOR" \
    --book-producer "$PUBLISHER" \
    --isbn "$ISBN_PDF" \
    --comments "$DESCRIPTION" \
    --language ita \
    --pubdate "$CURR_DATE" \
    --publisher "$PUBLISHER" \
    --tags "$TAGS"

  rm "$EPUB"
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
# build_pdf_latex
build_pdf_calibre
time_end
report
