#!/bin/bash

# measure script timing
time_start() {
  START=$(date +%s%3N)
}
time_end() {
  END=$(( $(date +%s%3N) - $START ))
}

# remove any previous prepared version
clean() {
  echo "[+] cleaning previous files..."
  find "$SRC" -maxdepth 1 -type f -name '*.md' -exec rm {} \;
}

# convert .docx files to markdown
prepare_markdown() {
  echo "[+] preparing markdown files..."

  # search for .docx files
  DOCX_FILES=$( find "$DOCX" -type f -name '*.docx' -print | sort )

  # loop all .docx files found:
  for SELECTED in $DOCX_FILES
    # and convert each to markdown
    do
      echo "[+] converting $SELECTED to markdown..."
      # Change output extension
      CONVERTED="${SELECTED%.*}.md"
      # Convert .docx to .md
      pandoc --smart \
      --read docx \
      --write markdown \
      --wrap=preserve \
      --extract-media='inc/images' \
      "$SELECTED" \
      -o "$CONVERTED"
  done
  echo "[+] all files converted!"
}

# move all converted files up into "src" dir
move_markdown_files() {
  echo "[+] moving converted files into \"src\" dir!"
  find "$DOCX" -type f -name '*.md' -exec mv {} ./src \;
  # Make sure all files end with an empty newline
  find "$SRC" -type f -name '*.md' -exec sed -i -e '$a\\n' {} \;
  echo "[+] markdown files are ready!"
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
prepare_markdown
move_markdown_files
time_end
report
