#!/bin/bash

if [[ "it_IT" != $CURRENT_LOCALE ]]; then
  echo "[+] Testing dependencies..."
else
  echo "[+] Controllo delle dipendenze..."
fi

if [[ ! -x $(which pandoc) ]] ||
   [[ ! -x $(which latex) ]] ||
   [[ ! -x $(which basename) ]] ||
   [[ ! -x $(which find) ]] ||
   [[ ! -x $(which sed) ]] ||
   [[ ! -x $(which rm) ]]; then
  if [[ "it_IT" != $CURRENT_LOCALE ]]; then
    echo "[-] Dependencies unmet.  Please verify that the following are installed, executable, and in the PATH:  pandoc, latex, basename, find, sed, rm"
  else
    echo "[-] Ci sono delle dipendenze mancanti.  Verifica che i seguenti programmi siano installati, eseguibili, e presenti nel percorso di sistema (PATH):  pandoc, latex, basename, find, sed, rm"
  fi

  exit 1

else

  if [[ "it_IT" != $CURRENT_LOCALE ]]; then
    echo "[+] All needed dependencies are satisfied."
  else
    echo "[+] Tutte le dipendenze sono soddisfatte."
  fi

fi
